# Media grid plugin for Payload CMS

> [!NOTE]
> The package can be installed, but the styles is causing an error. Do not install yet.

## Installation

```
pnpm add payload-media-grid-plugin
```

## Usage

```typescript
import Media from "../collections/Media";
import mediaGridPlugin from "payload-media-grid-plugin";

export default buildConfig({
  collections: [Media],
  plugins: [
    mediaGridPlugin({
      collections: {
        [Media.slug]: true,
      },
    }),
  ],
});
```
