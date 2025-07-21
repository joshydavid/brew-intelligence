<a id="readme-top"></a>

![Issue](https://img.shields.io/github/issues/joshydavid/brew-intelligence)
![Pull Request](https://img.shields.io/github/issues-pr/joshydavid/brew-intelligence)
![Release Badge](https://img.shields.io/github/v/release/joshydavid/brew-intelligence)

# ☕ Brew Intelligence

<img src="https://github.com/user-attachments/assets/58f0d99a-74f1-407e-a5b9-a93af60f19ef" width="800" alt="brew intelligence"  />
<br />
<br />

Brew Intelligence, your personal coffee brewing companion. Whether you’re pulling a perfect espresso, dialing in a V60, or experimenting with your coffee setup, Brew Intelligence is here to help you brew better.

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

- [Java Spring Boot](https://spring.io/projects/spring-boot)
- [PostgreSQL](https://www.postgresql.org)
- [Redis](https://redis.io)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [AWS EC2](https://aws.amazon.com/ec2)
- [AWS RDS](https://aws.amazon.com/rds)
- [AWS Amplify](https://aws.amazon.com/amplify)
- [Gemini API](https://ai.google.dev/gemini-api/docs)
- [Swagger UI (API Documentation)](https://api-brew.joshydavid.com/docs.html)

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

   ```
   # frontend
   cp .env.sample .env

   # backend
   cp .env.sample .env.local
   ```

4. Ensure you have PostgreSQL running locally (or accessible via network) with a database configured that matches the `.env.local` settings.

5. Run the project in development environment

   ```
   # frontend
   bun run dev

   # backend
   mvn spring-boot:run
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgement

Developed by [Joshua David](https://joshydavid.com)

<a href="https://joshydavid.com">
  <img src="https://github.com/user-attachments/assets/4dfe0c89-8ced-4e08-bcf3-6261bdbb956d" width="80">
</a>
