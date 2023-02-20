# Kandilli API

[Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü](http://www.koeri.boun.edu.tr/scripts/lst1.asp)'nün son dakika depremleri listesinin REST API halidir. Vercel REST API desteği üctretsiz olduğu sürece ücretsizdir. Hiçbir ticari amaç için kullanılmamaktadır. İletişim için [mail adresim](mailto:ibrahimodev42@gmail.com).

## Son 100 deprem

[https://kandilli-api.vercel.app/api](https://kandilli-api.vercel.app/api)

## Örnek Sorgu URL

[https://kandilli-api.vercel.app/api?sort=ml&minml=4&sehir=ELAZIG&limit=500](https://kandilli-api.vercel.app/api?sort=ml&minml=4&sehir=ELAZIG&limit=500)

500 deprem arasından ELAZIG şehrindeki minimum 4 büyüklüğündeki depremleri deprem büyüklüğüne göre sıralaması için bir sorgu.

## Filtrelemeler

Daha iyi veriler elde etmeniz için birkaç filtreleme ekledim.

### ?sehir=

Büyük harflerle ve ingilizce karakterlere uygun bir şekilde türkiyedeki şehirlerden herhangi birisine göre verileri sıralatabilirsiniz.

### ?limit=

`10` büyük ve `500` küçük olacak şekilde istediğiniz sayıda veri getirebilirsiniz. Varsayılan ```100```.

### ?sort=

En büyükten en küçüğe olacak şekilde sıralmasını istediğiniz anahtar değeri yazarasnız ona göre sıralar.

### ?minml=

Depremin büyüklük değeri olan ml nin minumum değerine göre verileri getirebilirsiniz.
