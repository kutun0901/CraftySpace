from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import  InCartItem, db
from app.forms.shopping_cart_form import ShoppingCartForm
from .auth_routes import validation_errors_to_error_messages

shopping_cart_routes = Blueprint("shoppingCart", __name__)


@shopping_cart_routes.route('/')
@login_required
def get_all_items_in_cart ():
    items = InCartItem.query.filter(InCartItem.user_id == current_user.id).all()
    return [item.to_dict() for item in items]


@shopping_cart_routes.route('/', methods=["POST"])
@login_required
def add_to_cart():
    data = request.get_json()
    form = ShoppingCartForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        # Check if the item already exists in the cart
        item = InCartItem.query.filter_by(user_id=data["user_id"], product_id=data["product_id"]).first()

        if item:
            # If the item already exists, increase the quantity
            item.quantity += data["quantity"]
        else:
            # If the item does not exist, create a new item
            item = InCartItem(
                user_id=data["user_id"],
                product_id=data["product_id"],
                quantity=data["quantity"],
            )
            db.session.add(item)

        db.session.commit()
        return item.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}

@shopping_cart_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_cart_item(id):
    data = request.get_json()
    item = InCartItem.query.get(id)

    if item:
        item.quantity = data.get("quantity", item.quantity)
        db.session.commit()

    return item.to_dict()

@shopping_cart_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def remove_item_in_cart(id):
    item = InCartItem.query.get(id)

    if not item:
        return {"error": "Item not found"}, 404

    db.session.delete(item)
    db.session.commit()
    return {"message": "Successfully removed"}
