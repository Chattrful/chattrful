FactoryBot.define do
  factory :participant do
    conversation { nil }
    participant_id { "" }
    participant_type { "MyString" }
  end
end
