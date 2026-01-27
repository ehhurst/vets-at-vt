## DEVELOPMENT

1. Install Volta
   - mac: in terminal `curl https://get.volta.sh | bash`
   - windows powershell `winget install Volta.Volta` ?
2. Resart terminal
3. Verify installation with `volta -v`
4. Install node and npm versions `volta install node@20.19.6 npm@10.2.4`
5. Verfy node versions inside project directory `node -v` `npm -v`

### Option A: local dev (Volta)

````bash
npm install
npm run dev
````

### Option B: Docker development

```docker compose up --build```

app runs at http://localhost:3000

```docker compose down```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project is deployed on Vercel. When you push and attempt a PR, Vercel will redeploy with those changes prior to merge. 
