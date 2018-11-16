# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: 'Luke', highscore: 0)
User.create(name: 'Mike', highscore: 0)
User.create(name: 'Max', highscore: 0)
User.create(name: 'Casey', highscore: 0)
User.create(name: 'Asaf', highscore: 0)

Game.create(user_id: 1, score: 0)
Game.create(user_id: 2, score: 0)
Game.create(user_id: 3, score: 0)
Game.create(user_id: 4, score: 0)
Game.create(user_id: 5, score: 0)
