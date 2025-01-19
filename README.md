# CryptoPot 🪙

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Angular](https://img.shields.io/badge/frontend-Angular-red.svg)
![Symfony](https://img.shields.io/badge/backend-Symfony-green.svg)
![Solidity](https://img.shields.io/badge/blockchain-Solidity-purple.svg)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue.svg)
![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

CryptoPot is a decentralized crowdfunding platform that enables charities to receive cryptocurrency donations transparently and securely using blockchain technology. The platform is built with a robust **Angular** front-end, a **Symfony** back-end, and smart contracts written in **Solidity**.

---

## 🌟 Features

- **Secure Fundraising:** Transparent and traceable crypto donations via Ethereum smart contracts.
- **Real-Time Campaign Tracking:** Dynamic updates on campaign progress.
- **User Authentication:** Secure login and donation processes via MetaMask.
- **Multi-Charity Support:** Enables multiple charities to create and manage fundraising campaigns.
- **Stablecoin Support:** Accepts USDT, USDC, and BUSD to ensure stable donations.

---

## 🛠️ Tech Stack

- **Frontend:** Angular (TypeScript, RxJS, Bootstrap)
- **Backend:** Symfony (PHP, REST API)
- **Blockchain:** Solidity (Ethereum smart contracts)
- **Database:** PostgreSQL
- **Tools & Libraries:** Web3.js, Ethers.js, MetaMask integration

---

## 🚀 Getting Started

Follow the steps below to set up and run the CryptoPot project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Angular CLI](https://angular.io/cli) (v15+)
- [PHP](https://www.php.net/downloads.php) (v8.1+)
- [Composer](https://getcomposer.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [MetaMask](https://metamask.io/) (browser extension)

---

### 🔧 Installation

#### 1. Clone the repository

```bash
git clone https://github.com/your-repo/cryptopot.git
cd cryptopot
```

#### 2. Front-End Setup (Angular)

Navigate to the `frontend/` directory and install dependencies:

```bash
cd frontend
npm install
```

#### 3. Start Angular Development Server

```bash
ng serve --open
```

The application will run at `http://localhost:4200`.

---

#### 4. Back-End Setup (Symfony)

Navigate to the `backend/` directory and install dependencies:

```bash
cd backend
composer install
```

#### 5. Configure the Environment Variables

Create a `.env` file in the `backend/` directory with the following content:

```plaintext
APP_ENV=dev
APP_DEBUG=true
DATABASE_URL=postgresql://user:password@localhost:5432/cryptopot
```

Replace `user` and `password` with your PostgreSQL credentials.

#### 6. Run Database Migrations

```bash
php bin/console doctrine:migrations:migrate
```

#### 7. Start Symfony Development Server

```bash
php -S 127.0.0.1:8000 -t public
```

The API will be available at `http://127.0.0.1:8000`.

---

### 🧪 Running Tests

#### Front-End Tests

```bash
ng test
```

#### Back-End Tests

```bash
php bin/phpunit
```

---

### 📜 Smart Contracts Deployment

#### 1. Install Dependencies

Navigate to the `contracts/` directory and install dependencies:

```bash
cd contracts
npm install
```

#### 2. Compile the Contracts

```bash
npx hardhat compile
```

#### 3. Deploy to Ethereum Testnet (Rinkeby)

Ensure you have configured your `.env` file with an Infura API key and a wallet private key:

```plaintext
INFURA_API_KEY=your_infura_api_key
WALLET_PRIVATE_KEY=your_wallet_private_key
```

Run the deployment script:

```bash
npx hardhat run scripts/deploy.js --network rinkeby
```

---

### 🎯 Project Structure

```
cryptopot/
│-- frontend/          # Angular front-end
│   ├── src/
│   ├── package.json
│   ├── angular.json
│-- backend/           # Symfony back-end
│   ├── src/
│   ├── config/
│   ├── composer.json
│-- contracts/         # Solidity smart contracts
│   ├── contracts/
│   ├── scripts/
│   ├── hardhat.config.js
│-- README.md
```

---

### 💡 Future Improvements

- Add support for additional blockchains such as BNB Chain and Polygon.
- Implement multi-signature wallets for enhanced security.
- Introduce a mobile-friendly UI.

---

### 📧 Contact

For any questions or contributions, feel free to reach out:

- Email: support@cryptopot.com
- Twitter: [@CryptoPotOfficial](https://twitter.com/CryptoPotOfficial)

---

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy using **CryptoPot**! 🚀
