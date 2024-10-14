# GraphLearner

GraphLearner is a personal project dedicated to exploring and mastering the core concepts of GraphQL. This project utilizes PostgreSQL as the database system and pgAdmin 4 for database management.

## PostgreSQL Setup

To manage PostgreSQL, use the following alias commands for convenience:

- **Start PostgreSQL**:
  ```bash
  alias pg_start="launchctl load ~/Library/LaunchAgents"
  ```

- **Stop PostgreSQL**:
   ```bash
   alias pg_stop="launchctl unload ~/Library/LaunchAgents"
   ```


## Additionally, the following command sets up the necessary symbolic link for PostgreSQL:
   ```bash
   ln -sfv /opt/homebrew/opt/postgresql@14/*.plist ~/Library/LaunchAgents
   ```
   
## Tools Used
- **PostgreSQL 14**: A powerful, open-source object-relational database system.
- **pgAdmin 4**: A web-based interface for managing PostgreSQL databases.

## Getting Started

1. Install PostgreSQL:
   ```bash
   brew install postgresql@14
   ```

2. Start PostgreSQL as a service:
   ```bash
   brew services start postgresql@14
   ```

