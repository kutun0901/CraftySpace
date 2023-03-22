from .db import db, SCHEMA, add_prefix_for_prod, environment

class ProductImage(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    product = db.relationship("Product", back_populates="images")


    def to_dict(self):
        return {
            "imageUrl": self.image_url,
            "productId": self.product_id
        }
