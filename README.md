# \<BitWarriors/\>
## Admin Service w/ React

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) <br/>
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

> [!IMPORTANT]
> **This project is currently under heavy development.**

**\<BitWarriors/\>** is an AI-powered competitive coding platform designed to help beginners improve their programming skills and in turn their problem solving abilities. BitWarriors draws inspiration from platforms like [Leetcode](https://leetcode.com/) and [CodeWars](https://codewars.com/), offering a simplified and beginner friendly version.

**This repository** hosts the backend (and a static react frontend) of the Administrator Service part of this project, built using the **MERN** stack. The Admin service was split off into its own repository to ensure:

- Better emphasis for separation of concerns as the Admin side is in no way related to the User facing side of the project.
- The Admin panel is available even if the User facing application (NextJS) goes down.
- Any bugs or vulnerabilities (or even attempts of attack) on the user facing site does not propogate to the admin facing site.

## 🚀 Getting Started

>[!NOTE]
> **BitWarriors** is a project built using the Microservices architecture. The user facing side of the application (ie: [Frontend with Next.js](https://github.com/waterrmalann/bit-warriors-nextjs) and [Backend services](https://github.com/waterrmalann/bit-warriors-backend)) must be running in order for the Admin panel to start serving its purpose. Both of these are under heavy development. Stay tuned for instructions to self-host!

## 🤝 Contribution

>[!NOTE]
> This project is far from complete to start accepting contributions.

## License

This project is licensed under the **AGPLv3 License**, see [LICENSE](LICENSE).