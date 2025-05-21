# ☕ Brew Intelligence

![Issue](https://img.shields.io/github/issues/joshydavid/joshua-david)
![Pull Request](https://img.shields.io/github/issues-pr/joshydavid/joshua-david)
![Release Badge](https://img.shields.io/github/v/release/joshydavid/joshua-david)

<img src="https://github.com/user-attachments/assets/21b14349-4657-4aea-a82a-dcef198fcfbc" width="800" alt="brew intelligence"  />
<br />
<br />

Brew Intelligence — your personal coffee companion. Whether you’re pulling a perfect espresso, dialing in a V60, or experimenting with your coffee setup, Brew Intelligence is here to help you brew better.

- [View Project](https://api-brew.joshydavid.com)
- [View API Documentation](https://brew.joshydavid.com/docs.html)
- [Report Bug](https://github.com/joshydavid/brew-intelligence/issues/new/choose)

## Features

- Browse a curated coffee bean library featuring origins, roast profiles, tasting notes, and processing methods.
- Unlock expert recipes, including Jeff Hoffman’s precision brews—from his world championship V60 to clever AeroPress ratios and beyond.
- Add your own recipes and fine-tune them over time—track your tweaks, dial-ins.
- Track your personal coffee beans—log roast dates, origin details, and freshness reminders to keep every cup at its peak.
- Chat with Brew Intelligence to get real-time support guidance, from dialing in espresso to troubleshooting your pour-over.

## Tech Stack

- Java Spring Boot
- PostgreSQL
- Redis
- React
- Tailwind CSS
- Amazon Web Services
- Docker
- Swagger UI (API Documentation)

## Getting Started

1. Clone the project

   ```
   git clone https://github.com/joshydavid/brew-intelligence.git
   ```

2. Install dependencies

   ```
   # frontend
   cd frontend
   bun install

   # backend
   cd backend
   mvn clean install -U
   ```

3. Set up environment variables

   `cp .env.sample .env`

4. Run the project in development environment

   ```
   # frontend
   bun run dev

   # backend
   docker compose up --build
   ```

## Acknowledgement

Developed by [Joshua David](https://joshydavid.com)

<a href="https://joshydavid.com">
  <img src="https://github.com/user-attachments/assets/4dfe0c89-8ced-4e08-bcf3-6261bdbb956d" width="80">
</a>
