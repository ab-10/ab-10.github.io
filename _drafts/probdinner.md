# Probabilistic Dinner

_How expected value can be used for simple mental arithmetic when dealing with uncertain events._

After going through the agony of finding a flat in London, I decided to throw a housewarming party.
The decision was, obviously, motivated by a careful value assessment:

> Close relationships, more than money or fame, are what keep people happy throughout their lives, [Grant Study] revealed.
> Those ties protect people from life’s discontents, help to delay mental and physical decline, and are better predictors of long and happy lives than social class, IQ, or even genes.

[From Harvard Gazette](https://news.harvard.edu/gazette/story/2017/04/over-nearly-80-years-harvard-study-has-been-showing-how-to-live-a-healthy-and-happy-life/)

What [Grant Study](https://en.wikipedia.org/wiki/Grant\_Study) forgot to mention, is how much stress and frustration maintaining such relationships involves.
Yet the root of my frustration was simple -- humans are hard to predict.
See, I want to ensure that the party's attendance is above a certain minimum.
Also, my living room has a maximum carrying capacity, albeit flexible if guests are willing to sit on the floor.
Then, as a good host, I'd like to ensure that we don't run out of supplies.
And as a person with finite resources, I'd prefer not to overbuy such supplies.

Surprisingly, I found that thinking of guest attendance as a probabilistic event to greatly reduce my frustration.
As now I only have to think about the expected value of the this event (i.e. the expected number of guests).
If the expected value becomes too low, I just invite more people[^1].

Let me set the problem.

# The problem

First, let's express the dinner party as a probability event.

We can measure whatever value we care about, such as conversation quality, bottles of wine drunk, or programming jokes made.
However, the most relevant one for us is the number of people who attend the party.

Now every guest we invite has a probability of turning up to our dinner[^2].

Conveniently, the expected value of our probabilistic dinner is the just the sum of individual guest probabilities.
Let's set some rough probabilities:

No: 0%
Invited but not responded: 50%
RSVP'ed: 80%
Yourself: 100%

As you're going to apply this method further, you'll know what to expect of people and will become better at estimating the probabilities.
But this should be a fine starting point.

TODO: work through an example.

TODO: then show what actions one can take depending on their constraints and targets.

Constraints: minimum no of people (otherwise it's not a party) and maximum no of people you can handle.

Target value:

Some basic assumptions:

Probabilistic event:

Expected value:


# Neat properties

1. As we can assume that the probability density function of expected number of guests follows a normal distribution, we're likely to be slightly off but unlikely to be far off in our calculations.
    This is useful for planning, as having slightly too much food is fine.
    If there's a bit too little, guests can either have smaller portions or you can whip up a quick salad to mitigate the issue.
    But the probability of you having to go to the store or fill your fridge to the brim with leftovers is fairly low.
2. Planning for a fractional number of guests is surprisingly convenient for recipes.
    You can actually cook for 5.5 guests!
3. Explicit assumptions.
    You might get the probabilities wrong.
    That's great.
    Because it allows you to get them less wrong the next time.

# Mental health benefits

I find this mental model delightful.
Individual humans are complex and unpredictable.
Like snowflakes, individual humans are complex and unpredictable.
Predicting individual trajectory of a snowflake is insanely hard.
But predicting how many of them will fall on your driveway is done by meteorologists all the time.
So if you want to know whether enough snowflakes will land on your driveway for you to have to shovel snow, it's better to study them in aggregate.

# Advanced problems in probabilistic dinning

1. Assigning value to individuals i.e. maximizing value of individuals while constraining number of people.
2. Assigning value to the group created.
    Each individual belongs to multiple subgroups (e.g. age, profession, language).
    There's a target similarity score between groups -> e.g. 0.7 subgroup overlap (you want people to be sufficiently similar to have shared interests but reasonably different to have optimal amount of new information to share).
    A subgroup is more valuable if fewer people outside of the group belong to it.
    E.g. I speak English, Russian, and Latvian.
    In a dinner party in London, starting the conversation with "you speak English, no way so do I!" sounds like an awkward teen's pickup line.
    Finding Russian speakers in London is reasonably common but there's some sense of bond.
    But if I find a Latvian speaker in a dinner party, I'd probably loose my shit (in a good way).

    E.g. inviting just Latvians -> good, inviting 4 Latvians and 1 non Latvian -> bad as the Latvians are likely to talk in Latvian amongst themselves.

[^1]: If the expected value of guests gets too high, I just provide unreasonable answers to "Should I bring anything?".
[^2]: The pedantic reader might note that guests we don't invite still might turn up. If such guests provide a non-trivial probability to your dinners, I'm afraid you have bigger problems than calculating guest turnout.
