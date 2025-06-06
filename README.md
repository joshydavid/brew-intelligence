<a id="readme-top"></a>

![Issue](https://img.shields.io/github/issues/joshydavid/joshua-david)
![Pull Request](https://img.shields.io/github/issues-pr/joshydavid/joshua-david)
![Release Badge](https://img.shields.io/github/v/release/joshydavid/joshua-david)

# ☕ Brew Intelligence

<img src="https://github.com/user-attachments/assets/21b14349-4657-4aea-a82a-dcef198fcfbc" width="800" alt="brew intelligence"  />
<br />
<br />

Brew Intelligence — your personal coffee companion. Whether you’re pulling a perfect espresso, dialing in a V60, or experimenting with your coffee setup, Brew Intelligence is here to help you brew better.

- [View Project](https://brew.joshydavid.com)
- [View API Documentation](https://api-brew.joshydavid.com/docs.html)
- [Report Bug](https://github.com/joshydavid/brew-intelligence/issues/new/choose)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

- Browse a curated coffee bean library featuring origins, roast profiles, tasting notes, and processing methods.
- Add your own recipes and fine-tune them over time.
- Track your personal coffee beans, log roast dates, origin details, and freshness reminders to keep every cup fresh.
- Chat with Brew Intelligence to get real-time support guidance, from dialing in espresso to troubleshooting your pour-over.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Tech Stack

- Java Spring Boot
- PostgreSQL
- Redis
- React
- Tailwind CSS
- Amazon Web Services
- Docker
- Swagger UI (API Documentation)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Achievements

- Developed a full-stack Java Spring Boot web application leveraging object-oriented design, builder pattern and MVC architecture from 0 to 1 during the Summer 2025 break.
- Implemented token-bucket algorithm for rate limiting (50 requests/min) to prevent API overload.
- Integrated Redis caching to reduce database reads and cut API response time from 790ms to 50ms.
- Leveraged Large Language Models to analyse grind results and deliver tailored brewing advice.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgement

Developed by [Joshua David](https://joshydavid.com)

<a href="https://joshydavid.com">
  <img src="https://github.com/user-attachments/assets/4dfe0c89-8ced-4e08-bcf3-6261bdbb956d" width="80">
</a>
