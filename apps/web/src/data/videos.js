// Posters extraídos dos próprios vídeos; os MP4 só são abertos no player.
export const videos = [
  {
    "id": "3-brinquedos",
    "title": "3 Brinquedos",
    "description": "3 Brinquedos — produção audiovisual AVLS.",
    "thumbnail": "/videos/3-brinquedos-poster.jpg",
    "media": {
      "type": "video",
      "src": "/videos/3 Brinquedos .mp4"
    }
  },
  {
    "id": "luz-do-painel",
    "title": "Luz do painel",
    "description": "Luz do painel — produção audiovisual AVLS.",
    "thumbnail": "/videos/luz-do-painel-poster.jpg",
    "media": {
      "type": "video",
      "src": "/videos/Luz do painel .mp4"
    }
  },
  {
    "id": "paciencia",
    "title": "Paciência",
    "description": "Paciência — produção audiovisual AVLS.",
    "thumbnail": "/videos/paciencia-poster.jpg",
    "media": {
      "type": "video",
      "src": "/videos/Paciência .mp4"
    }
  },
  {
    "id": "pesa-mais",
    "title": "Pesa mais",
    "description": "Pesa mais — produção audiovisual AVLS.",
    "thumbnail": "/videos/pesa-mais-poster.jpg",
    "media": {
      "type": "video",
      "src": "/videos/Pesa mais .mp4"
    }
  },
  {
    "id": "pneus",
    "title": "Pneus",
    "description": "Pneus — produção audiovisual AVLS.",
    "thumbnail": "/videos/pneus-poster.jpg",
    "media": {
      "type": "video",
      "src": "/videos/Pneus.mp4"
    }
  },
  {
    "id": "rr-mecanica",
    "title": "RR mecanica",
    "description": "RR mecanica — produção audiovisual AVLS.",
    "thumbnail": "/videos/rr-mecanica-poster.jpg",
    "media": {
      "type": "video",
      "src": "/videos/RR mecanica .mp4"
    }
  }
];

export const heroVideo = videos.find(video => video.id === 'rr-mecanica');
