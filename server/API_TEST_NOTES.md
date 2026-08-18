# API Test Notları

Test tarihi: 4 Ağustos 2026

## 1. GET /health

Amaç: Backend sunucusunun çalıştığını kontrol etmek.

Beklenen durum: 200 OK  
Gerçekleşen durum: 200 OK  
Sonuç: Başarılı

Cevap:

```json
{
  "status": "ok",
  "message": "Backend çalışıyor."
}