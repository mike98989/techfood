FROM php:8.1.0

# Update package lists and install required dependencies
RUN apt-get update && \
    apt-get install -y openssl zip unzip git libpng-dev zlib1g-dev libjpeg-dev && \
    docker-php-ext-configure gd --with-jpeg && \
    docker-php-ext-install pdo_mysql gd


# Set working directory and copy Laravel application files
WORKDIR /app

# Copy package.json and package-lock.json files
# COPY composer.json ./app

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set environment variable to allow Composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

COPY . .

# # Ensure the storage and bootstrap/cache directories exist
# RUN mkdir -p /app/storage

# # Change ownership and permissions
# RUN chown -R www-data:www-data /app/storage
# RUN chmod -R 775 /app/storage

# Install application dependencies
RUN composer update
RUN composer install 

# Expose the port and start the PHP server
EXPOSE $PORT

