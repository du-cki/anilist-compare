# AniList Compare

A tool to compare your anime/manga lists across multiple AniList accounts, this was heavily inspired
by [AbstractUmbra/Anilist-Comparison](https://github.com/AbstractUmbra/Anilist-Comparison) and the original idea was from them.

The official instance is running [here](https://anilist-comparison.vercel.app/).

This app also exposes a few JSON API routes;

## API Routes

### `POST /api/{...users}?list={list}&type={type}`

`list?`: The type of list to retrieve.

- Valid values: `PLANNING`, `COMPLETED`, `CURRENT`, `DROPPED`, `REPEATING`, `PAUSED`.

`type?`: The media type.

- Valid values: `ANIME`, `MANGA`

#### Example Request:

```json
$ curl -X POST /api/ducki3/blankets/itswilli?list=PLANNING

[
    {
        "id": 101921,
        "title": {
            "romaji": "Kaguya-sama wa Kokurasetai: Tensaitachi no Renai Zunousen"
        },
        "coverImage": {
            "medium":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx101921-VvdGQy1ZySYf.jpg",
            "color":"#e45086"
        },
        "bannerImage":"https://s4.anilist.co/file/anilistcdn/media/anime/banner/101921-GgvvFhlNhzlF.jpg"
    }
]
```
