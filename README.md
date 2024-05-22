# Media grid plugin for Payload CMS

> [!NOTE]
> Still under development.

> [!WARNING]
> Crashes when choosing a file from 'Choose from existing'.

## Installation

#### 1. install

`pnpm add payload-media-grid-plugin`

`npm install payload-media-grid-plugin`

`yarn add payload-media-grid-plugin`

#### 2. add to config

```typescript
import Media from "../collections/Media";
import mediaGridPlugin from "payload-media-grid-plugin";

export default buildConfig({
  collections: [Media],
  plugins: [
    mediaGridPlugin({
      collections: {
		// Make sure you change to your collection.
		// Add any other upload collections.
        [Media.slug]: true,
      },
    }),
  ],
});
```
