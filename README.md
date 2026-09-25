# AniList Compare

A tool to compare your anime/manga lists across multiple AniList accounts, this was heavily inspired
by [AbstractUmbra/Anilist-Comparison](https://github.com/AbstractUmbra/Anilist-Comparison) and the original idea was from them.

An instance is running [here](https://anilist-comparison.vercel.app/).

This app also exposes a few JSON API routes;

## API Routes

### `POST /api/{...users}?list={list}&type={type}`

`list?`: The type of list to retrieve.
- Valid values: `PLANNING`, `COMPLETED`, `CURRENT`, `DROPPED`, `REPEATING`, `PAUSED`.

`type?`: The media type.
- Valid values: `ANIME`, `MANGA`

#### Example Request:

```sh
$ curl -X POST https://anilist-comparison.vercel.app/api/ducki3/blankets/itswilli?list=COMPLETED

[
  {
    "id": 101922,
    "title": {
      "romaji": "Kimetsu no Yaiba"
    },
    "episodes": 26,
    "chapters": null,
    "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg",
    "averageScore": 82,
    "seasonYear": 2019,
    "coverImage": {
      "medium": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx101922-WBsBl0ClmgYL.jpg",
      "color": "#f1c9ae"
    },
    "statuses": {
      "faaz": {
        "score": 8.5,
        "progress": 26,
        "progressVolumes": null,
        "repeat": 0,
        "updatedAt": 1759526976
      },
      "blankets": {
        "score": 8,
        "progress": 26,
        "progressVolumes": null,
        "repeat": 0,
        "updatedAt": 0
      },
      "itswilli": {
        "score": 8,
        "progress": 26,
        "progressVolumes": null,
        "repeat": 0,
        "updatedAt": 1740435734
      }
    }
  },
  ...
]
```