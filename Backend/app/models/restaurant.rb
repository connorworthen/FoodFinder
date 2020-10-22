class Restaurant < ApplicationRecord
  has_many :users, through: :likes
  has_many :likes
end
