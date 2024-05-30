CREATE TABLE "category" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(45) NOT NULL
);

CREATE TABLE "article" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(45) NULL,
"cost" DECIMAL NULL,
"category_id" INT NOT NULL REFERENCES "category"(id)
);

CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(45) NOT NULL,
"email" VARCHAR(45) NOT NULL,
"password" VARCHAR(45) NOT NULL
);

CREATE TABLE "order" (
"id" SERIAL PRIMARY KEY,
"date" DATE NULL,
"user_id" INT NOT NULL REFERENCES "user"(id)
);

CREATE TABLE "ordered_article" (
"count" INT NOT NULL,
"order_id" INT NOT NULL REFERENCES "order"(id),
"article_id" INT NOT NULL REFERENCES "article"(id)
);

CREATE TABLE "feedback" (
"id" SERIAL PRIMARY KEY,
"date" DATE NULL,
"text" TEXT NULL,
"user_id" INT NOT NULL REFERENCES "user"(id),
"article_id" INT NOT NULL REFERENCES "article"(id)
);

CREATE TABLE "payment_data" (
"id" SERIAL PRIMARY KEY,
"carduser_name" VARCHAR(45) NOT NULL,
"card_number" VARCHAR(45) NOT NULL,
"validity_period" VARCHAR(45) NOT NULL,
"user_id" INT NOT NULL REFERENCES "user"(id)
);

CREATE TABLE "payment" (
"id" SERIAL PRIMARY KEY,
"summ" DECIMAL NULL,
"date" DATE NULL,
"order_id" INT NOT NULL REFERENCES "order"(id),
"payment_data_id" INT NOT NULL REFERENCES "payment_data"(id)
);

CREATE TABLE "cart" (
"count" INT NULL,
"user_id" INT NOT NULL REFERENCES "user"(id),
"article_id" INT NOT NULL REFERENCES "article"(id)
);