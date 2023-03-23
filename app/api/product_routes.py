from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Product, db, ProductImage
from app.forms.product_form import ProductForm
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint("products", __name__)

@product_routes.route('/')
def get_all_products():

    """
    get all products
    """
    products = Product.query.all()
    return [product.to_dict() for product in products]

@product_routes.route('/<int:id>')
def get_single_product(id):
    product = Product.query.get(id)

    if not product:
        return {"error": "Product no longer available"}
    else:
        return product.to_dict()


@product_routes.route('/', methods=['POST'])
@login_required
def create_a_new_product():
    """
    validate a new product via WTForms, create a new product in db
    and return the new product's detail
    """
    data = request.get_json()
    print(data)
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_product = Product(
            name=data['name'],
            description=data['description'],
            quantity=data['quantity'],
            category_id=data['category_id'],
            user_id=current_user.id,
            price=data['price']
        )

        for url in data['image_urls']:
            new_image = ProductImage(image_url=url)
            new_product.images.append(new_image)

        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}



@product_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_a_product(id):
    data = request.get_json()
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    product = Product.query.get(id)

    if not product:
        return {'errors': ['Product could not be found']}

    if product.user_id != current_user.id:
        return {'errors': ['You are not authorized to edit this product']}
    elif form.validate_on_submit():
        product.name=data['name']
        product.description=data['description']
        product.quantity=data['quantity']
        product.category_id=data['category_id']
        product.price=data['price']

        new_images = []
        for i, image in enumerate(product.images):
            if i < len(data['image_urls']):
                new_url = data['image_urls'][i]
                if new_url:
                    image.image_url = new_url
                    new_images.append(image)
            else:
                db.session.delete(image)

        for url in data['image_urls'][len(product.images):]:
            if url:
                new_image = ProductImage(image_url=url)
                new_images.append(new_image)
        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@product_routes.route('/current')
@login_required
def get_current_user_product():
    user_products = Product.query.filter(Product.user_id == current_user.id)
    return [product.to_dict() for product in user_products]


@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_a_product(id):
    product = Product.query.get(id)

    if not product:
        return {'errors': ['Product could not be found']}
    elif current_user.id != product.user_id:
        return {'errors': ['You are not authorized to delete this product']}
    else:
        db.session.delete(product)
        db.session.commit()
        return {"message": "Successfully removed"}
