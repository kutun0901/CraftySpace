from .db import db, SCHEMA, add_prefix_for_prod, environment


class InCartItem(db.Model):
    __tablename__ = "in_cart_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"), ondelete="CASCADE"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="in_cart_items")
    product = db.relationship("Product", back_populates="in_cart_items")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "product": self.product.to_dict()
        }
