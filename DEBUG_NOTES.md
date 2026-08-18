## Backend kapalı

Belirti:
Dersler ve sorular yüklenmiyor.

Console veya Network çıktısı:
ERR_CONNECTION_REFUSED

Asıl neden:
Express backend çalışmıyordu.

Çözüm:
server klasöründe `npm.cmd run dev` çalıştırıldı.

Bir daha nasıl önlerim:
Frontend ile çalışırken backend terminalinin de açık olduğunu kontrol ederim.

## Yanlış API URL'si

Belirti:
Frontend ders ve soru verilerini yükleyemiyor.

Console veya Network çıktısı:
localhost:9999 isteklerinde ERR_CONNECTION_REFUSED.

Asıl neden:
VITE_API_URL yanlış porta ayarlanmıştı.

Çözüm:
`.env` içindeki API adresi tekrar `http://localhost:3000` yapıldı ve frontend yeniden başlatıldı.

Bir daha nasıl önlerim:
Environment variable değerlerini kontrol eder, geliştirme ortamı için doğru backend adresini kullanırım.

## Yanlış route

Belirti:
API isteği çalışıyor ancak veri dönmüyor.

Console veya Network çıktısı:
404 Not Found

Asıl neden:
İstek `/lessons` yerine yanlışlıkla `/lessonss` adresine gönderildi.

Çözüm:
Endpoint doğru şekilde `/lessons` olarak düzeltildi.

Bir daha nasıl önlerim:
Frontend API fonksiyonlarındaki endpoint isimlerini backend route'larıyla karşılaştırırım.

## Eksik request body

Belirti:
Soru oluşturma isteği başarısız oluyor.

Console veya Network çıktısı:
400 Bad Request

Asıl neden:
POST /questions isteğinde zorunlu `content` alanı gönderilmedi.

Çözüm:
Request body'ye `lessonId` ve `content` birlikte eklendi.

Bir daha nasıl önlerim:
Frontend form validation kullanırım ve backend tarafında zorunlu alanları tekrar kontrol ederim.

## Geçersiz rol

Belirti:
Kullanıcı endpoint'e erişemiyor.

Console veya Network çıktısı:
403 Forbidden

Asıl neden:
Student rolündeki kullanıcı yalnızca teacher rolüne açık bir endpoint'e istek gönderdi.

Çözüm:
Doğru rol ile giriş yapıldı ve endpoint tekrar çağrıldı.

Bir daha nasıl önlerim:
Frontend'de role göre sayfaları ve butonları sınırlarım; asıl yetki kontrolünü ise backend'de `requireRole` middleware'i ile yaparım.

## Veritabanı bağlantısı hatası

Belirti:
Backend çalışmasına rağmen veritabanından gelen ders ve kurs verileri yüklenmiyor.

Gözlem:
Network isteği başarısız oldu ve backend terminalinde Prisma/PostgreSQL bağlantı hatası görüldü.

Asıl neden:
DATABASE_URL içinde yanlış veritabanı adı kullanıldı.

Çözüm:
server/.env içindeki DATABASE_URL doğru hale getirildi ve backend yeniden başlatıldı.

Bir daha nasıl önlerim:
DATABASE_URL değerini kontrol ederim, PostgreSQL'in çalıştığından emin olurum ve asıl veritabanı adını doğrularım.

## Breakpoint ile debug

POST /questions endpoint'ine breakpoint koyuldu.

İstek gönderildiğinde backend ilgili satırda durdu.

Variables bölümünden request body ve kullanıcı bilgileri incelendi.

Continue ile kodun çalışmasına devam edildi.