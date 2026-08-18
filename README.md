# React + TypeScript + Vite

# Mini Eğitim Platformu

Bu proje, Türkiye'deki ortaokul öğrencilerine matematik, fen ve İngilizce
derslerini kişiselleştirilmiş biçimde sunmayı amaçlayan AI destekli bir
eğitim platformunun küçük ölçekli prototipidir.

## Projenin Amacı

Öğretmenlerin ders içerikleri oluşturabilmesini, öğrencilerin dersleri
görüntüleyebilmesini ve derslerle ilgili AI'a veya öğretmenlerine soru
sorabilmesini sağlayan bir uygulama geliştirmek.

## Kullanıcılar

- Öğretmen
- Öğrenci

## Planlanan Temel Özellikler

- Öğretmen ve öğrenci ekranları
- Ders oluşturma ve listeleme
- Ders detaylarını görüntüleme
- Öğrencinin soru sorması
- AI destekli cevap oluşturma
- Öğretmene soru yönlendirme

## Kullanılan Teknolojiler

- React
- TypeScript
- Vite

İlerleyen aşamalarda:

- Node.js
- Express
- PostgreSQL
- Prisma
- AI API entegrasyonu

eklenecektir.

## Proje Durumu

Proje öğrenme ve prototip geliştirme aşamasındadır.


## Demo Authentication

Bu projede geliştirme ve rol testleri için geçici bir demo authentication sistemi kullanılmaktadır.

> Demo authentication — production için uygun değildir.

Demo sisteminde kullanıcı seçimi frontend üzerinden yapılır ve kullanıcı kimliği `x-demo-user-id` header'ı ile backend'e gönderilir.

Bu yaklaşım yalnızca geliştirme amacıyla kullanılır. Gerçek bir production sisteminde kullanıcı kimliği bu şekilde doğrulanmamalıdır; çünkü kullanıcı header değerini değiştirerek başka bir kullanıcıyı taklit edebilir.

Production ortamında güvenli bir authentication sistemi kullanılmalıdır. Örneğin:

- Güvenli giriş sistemi
- Hash'lenmiş şifreler
- Session veya doğrulanmış token
- Backend tarafında rol ve yetki kontrolü
- Kaynak sahipliği kontrolü

Bu projedeki demo sistemin amacı öğretmen ve öğrenci rollerini, route korumasını ve backend authorization mantığını test etmektir.

## Testing

Projede frontend ve backend için otomatik testler kullanılmaktadır.

Frontend test araçları:

- Vitest
- React Testing Library
- Jest DOM
- User Event

Backend test araçları:

- Vitest
- Supertest

Frontend testlerini çalıştırmak için:

```bash
npm test -- --run

Backend testlerini çalıştırmak için:

cd server
npm test -- --run

## Test edilen temel senaryolar
LessonCard verilen ders başlığını gösterir.
Ders başlığı boşsa yeni ders formu gönderilmez.
Öğrenci öğretmen sayfasına erişemez.
Backend boş soru içeriğini 400 Bad Request ile reddeder.
Öğrenci öğretmene ait soru cevaplama endpoint'ini kullanamaz ve 403 Forbidden alır.
Debugging

Geliştirme sırasında aşağıdaki hata senaryoları test edilmiştir:

Backend'in kapalı olması
Yanlış API URL kullanılması
Yanlış API route'u ve 404 Not Found
Eksik request body ve 400 Bad Request
Yetkisiz rol ve 403 Forbidden
PostgreSQL / DATABASE_URL bağlantı hataları
Eksik environment variable nedeniyle oluşabilecek backend hataları

VS Code breakpoint özelliği kullanılarak backend request'lerinin çalışma anındaki değerleri de incelenmiştir.

Daha ayrıntılı debug notları DEBUG_NOTES.md dosyasında bulunmaktadır.




