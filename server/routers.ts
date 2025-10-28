import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createFormSubmission } from "./db";
import { submitViaWebhook } from "./googleSheets";
import { submitOrderToM1, validateOrderData } from "./m1Affiliate";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  form: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
          phone: z.string().min(9, "El telefono debe tener al menos 9 digitos"),
          email: z.string().email().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Validate order data
          const validation = validateOrderData({
            name: input.name,
            phone: input.phone,
            email: input.email,
          });

          if (!validation.valid) {
            return {
              success: false,
              message: validation.errors.join(", "),
            };
          }

          // Save to database
          await createFormSubmission(input.name, input.phone);

          // Submit to M1 affiliate network
          const m1Result = await submitOrderToM1({
            name: input.name,
            phone: input.phone,
            email: input.email,
            geo: "ES",
            source: "landing_page",
          });

          // Also submit to Google Sheets as backup
          const sheetSuccess = await submitViaWebhook(
            input.name,
            input.phone
          );

          return {
            success: true,
            message: "Tu pedido ha sido enviado correctamente",
            m1Status: m1Result.success,
          };
        } catch (error) {
          console.error("Form submission error:", error);
          return {
            success: false,
            message: "Error al enviar el formulario. Por favor, intenta de nuevo.",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
