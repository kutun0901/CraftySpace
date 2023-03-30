from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import  Review, db
from app.forms.review_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime, timezone

review_routes = Blueprint("reviews", __name__)


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    data = request.get_json()
    review = Review.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not review:
        return {"errors": ["Comment could not be found"]}, 404
    elif review.user_id != current_user.id:
        return {"errors": ["User is unauthorized to edit comment"]}, 401

    if form.validate_on_submit():
        review.rating = data["rating"]
        review.comment = data["comment"]
        review.updated_at = datetime.utcnow()
        db.session.commit()
        return {"id": review.product.id, "review":review.to_dict() }, 200

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if not review:
        return {"errors": ["Comment could not be found"]}, 404
    elif review.user_id != current_user.id:
        return {"errors": ["User is unauthorized to edit comment"]}, 401
    else:
        db.session.delete(review)
        db.session.commit()
        return {"message": "successfully deleted"}
