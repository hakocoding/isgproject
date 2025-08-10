CREATE DATABASE isg_data;
USE isg_data;


CREATE TABLE factors (
  kind VARCHAR(255) NOT NULL,
  factor VARCHAR(255) NOT NULL,
  current VARCHAR(255) NOT NULL,
  risk VARCHAR(255) NOT NULL,
  suggestion VARCHAR(255) NOT NULL,
  severity INT,
  possibility INT,
  riskscore INT,
  riskClass VARCHAR(255) NOT NULL
  );

INSERT INTO factors (kind, factor, current, risk, suggestion, severity, possibility, riskscore, riskClass)
VALUES 
('Yangın', 'Yangın Tüpü', 'Uygun yerde değil', 'Yangın durumunda ulaşamama', 'Söndürücüler duvara asılmalı ve yerden yüksekliği 90 cm’yi aşmamalıdır.', '3', '3', '9', 'Orta'),
('Yangın', 'Yangın Tüpü', 'Periyodik bakımı geçmiş', 'Yangın durumunda fonksiyonunu yerine getirememe can kaybı, maddi kayıp.', 'Yangın söndürücülerinin periyodik bakımı yapılmalıdır.', '3', '3', '9', 'Orta'),

('Kişisel Koruyucu Donanım', 'Genel Durum', 'Yetersiz', 'Gerekli kişisel koruyucu donanım sağlanmalıdır.', 'Yetersiz donanım nedeniyle yaralanma veya sağlık riski.', '4', '4', '16', 'Çok Yüksek'),
('Kişisel Koruyucu Donanım', 'Genel Durum', 'Tamamen uygun', 'Durum iyi, ama düzenli kontrol gereklidir.', 'Donanım uygun, ancak periyodik kontrol edilmelidir.', '2', '2', '4', 'Düşük'),
('Kişisel Koruyucu Donanım', 'Genel Durum', 'Eğitim yok', 'Çalışanlara gerekli eğitim verilmelidir.', 'Eğitimsiz kullanım nedeniyle yaralanma riski.', '4', '3', '12', 'Yüksek'),

('İş Sağlığı ve Güvenliği Eğitimi', 'Eğitim Durumu', 'Eğitim yok', 'İSG eğitimleri düzenlenmelidir.', 'Çalışanların güvenlik konusunda yetersiz bilgiye sahip olması.', '4', '4', '16', 'Çok Yüksek'),
('İş Sağlığı ve Güvenliği Eğitimi', 'Eğitim Durumu', 'Güncel eğitim almış', 'Eğitim güncel, ama yenilenmesi gerekebilir.', 'Bilgilerin taze tutulması için düzenli eğitim önerilir.', '2', '2', '4', 'Düşük'),
('İş Sağlığı ve Güvenliği Eğitimi', 'Eğitim Durumu', 'Eğitim almış ama güncel değil', 'Eğitimin güncellenmesi önerilir.', 'Güncel olmayan eğitim nedeniyle risk artabilir.', '3', '3', '9', 'Orta');