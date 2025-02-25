# Prop Master

## Running the project

First, run the install deped:
```bash
pnpm i
```

First, run the development server:

```bash
pnpm run dev
```


# Notes

- instead of using `npx` us `pnpm dlx`

- if a this error appears regarding files which has the old export of `module.exports...`,
```bash
ReferenceError: module is not defined
at file...
```
then maybe try to change the extenstion of those file from `fileName.js` to `fileName.cjs`

- App hosted on [Prop-Master](https://prop-master.vercel.app/sign-in)

## Production

- You have to include `pnpm-lock.yaml` file in order for the app to be deployed through vercel
