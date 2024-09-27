# Use an official PHP image with Apache
FROM php:8.1-apache

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Enable Apache mod_rewrite for Laravel
RUN a2enmod rewrite

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Update Composer to the latest version
RUN composer self-update

# Set the working directory in the container
WORKDIR /var/www/backend

# Copy the backend app (Laravel) into the container
COPY . .

# Install Laravel dependencies
RUN composer install --no-scripts --no-autoloader
RUN composer dump-autoload --optimize

# Expose port 8000 to the outside world
EXPOSE $PORT

# Start the Laravel application using Artisan
# CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
