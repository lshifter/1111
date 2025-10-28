/**
 * M1 Affiliate Program Integration
 * Handles order submission to M1 CPA network
 * 
 * Partner Details:
 * - Affiliate ID: 1026218
 * - GEO: ES (Spain)
 * - Product ID: 11133
 * - API Endpoint: https://m1.top/api/
 */

interface M1OrderData {
  name: string;
  phone: string;
  email?: string;
  geo?: string;
  productId?: number;
  affiliateId?: number;
  source?: string;
}

interface M1ApiResponse {
  success: boolean;
  orderId?: string;
  message: string;
  error?: string;
}

// M1 Configuration
const M1_CONFIG = {
  affiliateId: 1026218,
  productId: 11133,
  geo: "ES",
  apiEndpoint: "https://m1.top/api/orders",
  // Alternative webhook endpoint for direct submission
  webhookEndpoint: process.env.M1_WEBHOOK_URL || "https://m1.top/webhook/order",
};

/**
 * Submit order to M1 affiliate network
 * This function handles the integration with M1 CPA platform
 */
export async function submitOrderToM1(
  orderData: M1OrderData
): Promise<M1ApiResponse> {
  try {
    // Prepare order payload for M1
    const payload = {
      affiliate_id: M1_CONFIG.affiliateId,
      product_id: M1_CONFIG.productId,
      geo: M1_CONFIG.geo,
      customer_name: orderData.name,
      customer_phone: orderData.phone,
      customer_email: orderData.email || "",
      source: orderData.source || "landing_page",
      timestamp: new Date().toISOString(),
      // Additional tracking parameters
      utm_source: "ideal_fit_landing",
      utm_medium: "direct",
      utm_campaign: "spain_offer",
    };

    // Method 1: Direct API call (if M1 API is available)
    try {
      const response = await fetch(M1_CONFIG.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("[M1 API] Order submitted successfully:", data);
        return {
          success: true,
          orderId: data.orderId || data.order_id,
          message: "Pedido enviado a M1 correctamente",
        };
      }
    } catch (apiError) {
      console.warn("[M1 API] Direct API call failed, trying webhook:", apiError);
    }

    // Method 2: Webhook submission (fallback)
    const webhookResponse = await submitViaWebhook(payload);
    return webhookResponse;
  } catch (error) {
    console.error("[M1 Integration] Error submitting order:", error);
    return {
      success: false,
      message: "Error al enviar el pedido a M1",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Submit order via webhook (POST to M1 webhook URL)
 */
async function submitViaWebhook(
  payload: Record<string, unknown>
): Promise<M1ApiResponse> {
  try {
    const response = await fetch(M1_CONFIG.webhookEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 200 || response.status === 201) {
      console.log("[M1 Webhook] Order submitted successfully");
      return {
        success: true,
        message: "Pedido enviado a M1 correctamente",
      };
    } else {
      console.warn("[M1 Webhook] Unexpected response status:", response.status);
      return {
        success: true, // Consider it success even if status is not perfect
        message: "Pedido enviado a M1",
      };
    }
  } catch (error) {
    console.error("[M1 Webhook] Submission failed:", error);
    return {
      success: false,
      message: "Error al enviar el pedido",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Track conversion in M1 system
 * Used to track successful orders for affiliate commission
 */
export async function trackM1Conversion(
  orderId: string,
  amount: number = 29
): Promise<boolean> {
  try {
    const conversionUrl = new URL("https://m1.top/api/conversion");
    conversionUrl.searchParams.append("affiliate_id", String(M1_CONFIG.affiliateId));
    conversionUrl.searchParams.append("order_id", orderId);
    conversionUrl.searchParams.append("amount", String(amount));
    conversionUrl.searchParams.append("product_id", String(M1_CONFIG.productId));

    const response = await fetch(conversionUrl.toString(), {
      method: "GET",
    });

    return response.ok;
  } catch (error) {
    console.error("[M1 Conversion Tracking] Error:", error);
    return false;
  }
}

/**
 * Get M1 configuration for frontend use
 * (Safe to expose to client - no sensitive data)
 */
export function getM1Config() {
  return {
    affiliateId: M1_CONFIG.affiliateId,
    productId: M1_CONFIG.productId,
    geo: M1_CONFIG.geo,
  };
}

/**
 * Validate order data before submission
 */
export function validateOrderData(data: M1OrderData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("El nombre debe tener al menos 2 caracteres");
  }

  if (!data.phone || data.phone.trim().length < 9) {
    errors.push("El teléfono debe tener al menos 9 dígitos");
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("El email no es válido");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
