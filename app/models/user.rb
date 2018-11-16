class User < ApplicationRecord
  has_many :games

  def set_highscore
    puts "setting hs"
    new_highscore = self.games.max{|a,b| a[:score] <=> b[:score]}.score
    self.update({highscore: new_highscore})
  end
end
