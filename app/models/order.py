from .db import db, SCHEMA, add_prefix_for_prod, environment


class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    purchased_date = db.Column(db.Date, nullable=False)


    user = db.relationship("User", back_populates="orders")
    product = db.relationship("Product", back_populates="orders")
