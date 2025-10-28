
// Minimal JS: ensure payment button is placed below text and opens redirect in new tab.
// Also track click (console) — adapt later to real analytics if needed.
document.addEventListener('DOMContentLoaded', function(){
  var pay = document.getElementById('pay-button');
  if(pay){
    pay.addEventListener('click', function(e){
      console.log('Pagar button clicked — redirecting.');
      // default link opens in new tab due to target="_blank"
    });
  }
});
