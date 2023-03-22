from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date, nullable=False, default=date.today())
    updated_at = db.Column(db.Date, nullable=False, default=date.today())
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")), nullable=False)

    user = db.relationship("User", back_populates="products")
    in_cart_items = db.relationship("InCartItem", back_populates="product")
    orders = db.relationship("Order", back_populates="product")
    reviews = db.relationship("Review", back_populates="product")
    category = db.relationship("Category", back_populates="products")
    images = db.relationship('ProductImage', back_populates="product", cascade="all, delete-orphan")

    def get_avg_rating(self):
        if len(self.reviews):
            sumRating = sum(review.rating for review in self.reviews)
            avgRating = sumRating / len(self.reviews)
            return avgRating
        else:
            return 0


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "user_id": self.user_id,
            "seller": self.user.to_dict(),
            "quantity": self.quantity,
            "categoryId": self.category_id,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            "avgRating": self.get_avg_rating(),
            "images": [image.image_url for image in self.images],
            "reviews": [review.to_dict() for review in self.reviews]
        }
