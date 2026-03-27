# Smart Home App

Akıllı ev cihazlarını mobil uygulama üzerinden yönetmek için geliştirilmiş full-stack bir projedir.  
Projede kullanıcı girişi, ev ve oda oluşturma, cihaz listeleme ve zamanlama (schedule) ekleme gibi temel özellikler bulunmaktadır.

## Proje Yapısı

```bash
smart-home-app/
│
├── backend/   # Node.js + Express + MongoDB API
└── mobile/    # React Native / Expo mobil uygulama

Kullanılan Teknolojiler
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcryptjs
dotenv
cors
nodemon
Mobile
React Native
Expo
React Navigation
Axios
AsyncStorage
Expo Vector Icons
React Native DateTimePicker
Özellikler
Kullanıcı kayıt olma ve giriş yapma
JWT ile authentication
Kullanıcıya ait ev oluşturma
Eve bağlı oda oluşturma
Odaya bağlı cihazları listeleme
Belirli gün ve saatlere göre schedule ekleme
Mobil uygulama ile backend entegrasyonu
Kurulum
1) Repoyu klonla
git clone <repo-link>
cd smart-home-app
Backend Kurulumu
cd backend
npm install
Backend için gerekli paketler

Eğer sıfırdan kurulum yapılacaksa şu paketler gereklidir:

npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon
Backend .env dosyası

backend klasörü içine .env dosyası oluştur:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smarthome
JWT_SECRET=your_jwt_secret_key

Not: MongoDB local kuruluysa bu bağlantı kullanılabilir.
MongoDB Compass kullanıyorsan veritabanı adı smarthome olmalıdır.

Backend çalıştırma
npm run dev

veya

node server.js

Backend başarılı şekilde çalışırsa terminalde MongoDB bağlantı mesajı görülmelidir.

MongoDB Kurulumu

Projede veritabanı olarak MongoDB kullanılmaktadır.

MongoDB local kullanım

Bilgisayarda MongoDB kuruluysa aşağıdaki bağlantı kullanılabilir:

MONGO_URI=mongodb://127.0.0.1:27017/smarthome
MongoDB Compass ile kontrol

MongoDB Compass üzerinden aşağıdaki veritabanısını kontrol edebilirsin:

Database Name: smarthome

Backend çalışıp veri eklenmeye başladığında koleksiyonlar otomatik oluşur.
Örnek koleksiyonlar:

users
homes
rooms
devices
schedules
Mobile Kurulumu
cd mobile
npm install
Mobile için gerekli paketler

Projeye göre temel paketler:

npm install axios
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npm install @react-native-async-storage/async-storage
npm install @react-native-community/datetimepicker
npm install @expo/vector-icons

Expo kullanılıyorsa:

npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npx expo install @react-native-async-storage/async-storage
npx expo install @react-native-community/datetimepicker
Mobile çalıştırma
npx expo start

QR kod ile telefon üzerinden veya emulator üzerinden açılabilir.

API Bağlantısı

Mobil uygulamanın backend’e bağlanabilmesi için API adresinin doğru tanımlanması gerekir.

Örnek:

const API = "http://192.168.X.X:5000/api";

localhost yerine bilgisayarın aynı Wi-Fi üzerindeki local IP adresi kullanılmalıdır.
Telefon ile test yapılacaksa mobil cihaz ve bilgisayar aynı ağa bağlı olmalıdır.

Çalıştırma Sırası
1. MongoDB başlat

MongoDB’nin aktif olduğundan emin ol.

2. Backend’i başlat
cd backend
npm run dev
3. Mobile uygulamayı başlat
cd mobile
npx expo start
Örnek Geliştirme Akışı
Kullanıcı kayıt olur / giriş yapar
Kullanıcı kendi evini oluşturur
Eve oda ekler
Odaya bağlı cihazlar listelenir
Cihazlar için schedule bilgileri eklenir
Mobil uygulama backend’den verileri çekerek kullanıcıya gösterir
Geliştirmeye Açık Alanlar
Cihaz durumlarını anlık güncelleme
Scene sistemi ekleme
Bildirim sistemi
Daha gelişmiş schedule yönetimi
Kullanıcı profil sayfası
Şifre sıfırlama ve email doğrulama
Cihaz bazlı detaylı ayarlar
UI/UX iyileştirmeleri
Backend tarafında JWT tabanlı manuel authentication yapısı kullanılmıştır.
Veriler MongoDB üzerinde tutulmaktadır.
Mobil uygulama React Native / Expo ile geliştirilmiştir.
Proje hem frontend hem backend mantığını bir arada içeren bir smart home prototype yapısıdır.
