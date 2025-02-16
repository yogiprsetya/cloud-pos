ALTER TABLE "product" ALTER COLUMN "description" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant_item" ALTER COLUMN "price" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "product_variant_item" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant_item" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant_label" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant_label" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;