# OpenPay PSE Colombia (patrón /charges + bank_account)

```
POST https://sandbox-api.openpay.co/v1/{MERCHANT_ID}/charges
```

— **no** usar `/pse` ni `country: COL`. Bug con indicativo 57 en el formulario de Openpay

## Body PSE

```json
{
  "method": "bank_account",
  "amount": 716,
  "currency": "COP",
  "iva": "190",
  "description": "Compra Herrera y Gomez",
  "order_id": "HYG-123",
  "redirect_url": "https://tudominio.com/success.html",
  "customer": {
    "name": "Cristian",
    "last_name": "Ceballos",
    "email": "correo@ejemplo.com",
    "phone_number": "3245894268",
    "requires_account": false,
    "customer_address": {
      "department": "Antioquia",
      "city": "Medellín",
      "additional": "CL 48 F CR 99 B 32"
    }
  }
}
```

## Respuesta

Redirigir a `payment_method.url`.
