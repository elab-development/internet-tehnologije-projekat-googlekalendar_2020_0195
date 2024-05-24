# Aplikacija za Upravljanje Događajima

Ova aplikacija omogućava korisnicima da efikasno upravljaju svojim događajima. Korisnici mogu kreirati, pregledati, ažurirati i brisati događaje putem intuitivnog korisničkog interfejsa. Na glavnoj stranici prikazuju se događaji za tekuću nedelju, uz opciju pretrage i filtriranja događaja.

## Funkcionalnosti

- **Kreiranje, pregled, ažuriranje i brisanje događaja:** Korisnici mogu lako dodavati nove događaje, pregledati detalje postojećih, vršiti izmene i brisati ih po potrebi.
- **Drag and Drop:** Jednostavno premeštanje događaja na novi datum korišćenjem funkcionalnosti povlačenja i puštanja.
- **Generisanje PDF izveštaja:** Korisnici mogu generisati PDF izveštaje sa događajima za offline pregled ili deljenje.
- **Upravljanje korisnicima:** Administratori mogu upravljati korisnicima, menjati njihov status i pregledati statistiku događaja po kategorijama.
- **Verski praznici:** Integracija sa spoljnim API-jem za prikaz verskih praznika koje korisnici mogu uključiti u svoj kalendar.
- **Početna stranica:** Pruža osnovne informacije o aplikaciji sa pristupom formama za prijavu i registraciju.
- **Registracija i prijava:** Korisnici se mogu registrovati putem jednostavne forme i prijaviti se kako bi dobili pristup svim funkcionalnostima aplikacije.

## Kako započeti

1. Klonirajte repozitorijum:
    ```sh
    git clone https://github.com/elab-development/internet-tehnologije-projekat-googlekalendar_2020_0195.git
    ```

2. Instalirajte zavisnosti - laravel:
    ```sh
    cd laravel
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate:fresh --seed
    php artisan serve
    ```

3.  Instalirajte zavisnosti - react:
    ```sh
    cd reactprojekat
    npm install
    npm start
    ```


