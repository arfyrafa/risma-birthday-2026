/**
 * =====================================================================
 *  SEMUA ISI WEBSITE ADA DI FILE INI — edit di sini, tidak perlu
 *  menyentuh file lain.
 *
 *  Ganti foto:
 *   - Timpa file di src/assets/photos/ dengan nama yang sama, ATAU
 *   - Taruh foto baru di folder public/photos/ lalu tulis "/photos/nama.jpg"
 *     pada `src` di bawah.
 * =====================================================================
 */
import heroImage from "../assets/photos/hero.jpg";
import moment1 from "../assets/photos/moment-1.jpg";
import moment2 from "../assets/photos/moment-2.jpg";
import moment3 from "../assets/photos/moment-3.jpg";
import selfie1 from "../assets/photos/selfie-1.jpg";
import selfie2 from "../assets/photos/selfie-2.jpg";
import selfie4 from "../assets/photos/selfie-4.jpg";
import selfie5 from "../assets/photos/selfie-5.JPG";
import selfie6 from "../assets/photos/selfie-6.jpeg";

export interface Photo {
  src: string;
  alt: string;
}

export const content = {
  siteTitle: "To My Favorite Person",

  /** Nama panggilan penerima & pengirim */
  name: "Risma",
  fullName: "Rizky Ramadhani Rismaya",
  from: "Arfy",

  /** Teks logo di navbar */
  logoText: "RISMA",

  birthday: { date: "12 Oktober 2026", age: 21 },

  hero: {
    /** Foto latar hero. Disarankan foto berkualitas tinggi (min. 1600px). */
    image: heroImage,
    /** Atur bagian foto yang tetap terlihat saat dipotong (CSS object-position). */
    imagePosition: "50% 8%",
    eyebrow: "A story made just for you",
    title: "To My Favorite Person",
    subtitle: "Out of all the stories in this world, you're my favorite.",
    cta: "Open My Letter",
    meta: {
      match: "100% Match",
      year: "2026",
      badge: "Happy 21st Birthday",
      genres: ["Romance", "Long Distance"],
    },
  },

  /** Baris foto di Home. Kosongkan array `photos` untuk menyembunyikan bagian ini. */
  gallery: {
    title: "Little Moments",
    photos: [
      { src: selfie1, alt: "Selfie berdua dulu" },
      { src: moment1, alt: "Kue ulang tahun dan buket bunga" },
      { src: selfie2, alt: "Selfie berdua diam-diam" },
      { src: moment2, alt: "Potret dengan topi koboi dan kue kecil" },
      { src: moment3, alt: "I Love candi Prambanan" },
      { src: selfie4, alt: "Selfie dulu , males bgt antri photobox" },
      { src: selfie5, alt: "Momen manis berdua di obelix" },
      { src: selfie6, alt: "Selfie cantik Risma" },
    ] as Photo[],
  },

  footer: "Made with love, just for you.",

  letter: {
    title: "A Letter for You",
    hint: "Tap the envelope to open it",
    back: "Back to Home",
    /** Isi surat — ganti dengan tulisanmu sendiri. Satu string = satu paragraf. */
    greeting: "Untuk Risma, Cantikku",
    paragraphs: [
      "Selamat ulang tahun yang ke-21. Hari ini, 12 Oktober 2026, aku cuma ingin satu hal: kamu tahu betapa bersyukurnya aku karena kamu ada di dunia ini, dan di dalam hidupku.",
      "Aku tahu tidak mudah merayakan hari spesial dari jauh. Aku tidak bisa duduk di sampingmu, ikut meniup lilin, atau memelukmu langsung. Tapi hari ini pikiranku ada di sana, bersamamu.",
      "Jarak memang membuat kita harus sabar menunggu kabar, menunggu waktu yang pas, dan menunggu hari bertemu. Tapi jarak tidak pernah membuatku berhenti memikirkanmu. Dari ujung layar sana, kamu tetap bagian favorit dari hariku.",
      "Di usia 21, semoga kamu selalu dikelilingi hal-hal baik, dimudahkan setiap langkahnya, dan semua doa yang kamu simpan diam-diam dijawab satu per satu. Semoga aku boleh terus menjadi salah satu orang yang ada untukmu, sedekat apa pun atau sejauh apa pun kita.",
      "Terima kasih sudah bertahan dan memilih aku di tengah jarak ini. Suatu hari nanti, semua kilometer ini akan jadi cerita yang kita ceritakan sambil duduk berdampingan.",
    ],
    closing: "Aku sayang kamu, hari ini dan di setiap kilometer di antara kita.",
    signoff: "Dengan sepenuh hati,",
    signature: "Arfy",
  },

  music: {
    /**
     * Kosongkan ("") untuk memakai musik ambient bawaan (dibuat langsung di browser).
     * Untuk lagu sendiri: taruh file mp3 di public/music/lagu.mp3 lalu isi "/music/lagu.mp3".
     */
    src: "",
    playLabel: "Play music",
    pauseLabel: "Pause music",
  },
};

export type Content = typeof content;
