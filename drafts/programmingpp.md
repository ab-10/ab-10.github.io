---
layout: post
title: "Programming++"
categories: Prose
date: 2024-04-23 10:00:00 +00000
---- 

Main argument I want to make: emerging code generation capabilities will unlock a paradigm shift in software engineering.

1. What are the issues with the current software engineering paradigms?
2. What technology will underpin the paradigm shift?
3. How will the actual solution look like?
4. How will this solution be implemented?
5. Why will teh required technological progress for realizing (4.) take place within the next 10 years?

I believe emerging code generation capabilities of LLMs will unlock a new paradigm in software engineering.
Now, I expect the reader to take this claim with a healthy pinch of salt.
Either predicting the nature of technological advancemenet or timing it is difficult.
I'm not claiming that I've done both.
Instead, I'm exposing my hypothesis around both.
Inviting scepticisim on my future predictions, with the goal of refining them.

## The most important limitation of enterprise code

I'll focus on the largest and best funded users of software engineering paradigms.
That is enterprise companies.

The central limitation of enterprise software engineering is speed.
The development speed is bottlenecked by the size and complexity of the system.
I believe that enterprises are nearing the limit on size and complexity that human teams of any size can work with.
Enterprise software engineers bang their heads against the slow development speed all the time.
We've grown to accept this unfortunate reality as status quo.
Just compare how long it takes to develop a new feature in a greenfield project vs in an enterpise codebase.

New feature development is not limited by the the time it takes to write the feature.
It is limited by the time it takes to integreate the feature into the rest of the codebase.
Then the number of features a company can roll out is further restricted by the ongoing maintenance costs.

Speed is the most important issue in enterprise software development.
Speed is the bottleneck for enterprise products to adjust to new market opportunities.
It is also the driving force in the cost of experimentation.
Therefore, I believe speed will be the driving force for the next software engineering paradigm.

I've laid out my prediction for the nature of the next software engineering paradigm.
Now I will predict the timing.
The timing is determined by the maturity and capabilities of the technology that will solve this problem.
I believe this technology will be code generation models.
The product driving the new software engineering paradigm will be a programming language.

## The technology underpining the paradigm shift

Within the next ten years large language models will become sufficiently powerful to automate all software engineering boring tasks.
Once the models can not only automate them but also perfom these tasks sufficiently reliably that we can use them in a compiler, a new programming language will be born.

More accurately, the product is best thought of as a new "programming language".
However, I don't think it will really be called that.
I think it will be sufficiently different as FORTRAN was from punch-card programming.
Let's call the paradigm-shifting product "programming++".

Programming++ will have the following similarities with the regular programing:
1. It will be a technical interface over a data manipulation system.
    Although natural language programming is becoming increasingly important, I doubt it will become the main programming paradigm for large-scale systems.

## Why is now the time to build a new metaprogramming paradigm?

There have been many previous failed attempts to create a new (meta-)programming paradigm.
1. Previous metaprogramming attempts mainly took advantage of good old fashioned AI and complex type systems, which was unable to generalize to programming projects beyond toy problems.
    1. We believe that LLMs are the missing bit for generalizability here.



## Why natural language programming won't suffice for enterprises?

Programming in natural language (e.g. English) has lead to significant hype.
I don't want to dismiss programming in natural language all together.
There definitely will be significant room for natural language programming in the future.
A lot of enterprise software targeting non-technical users can be implemented far more effectively with a natural language programming interface.
For example, using Python and Pandas is a signficiantly faster way to analyze spreadsheets than Micrososft Excel.
The only reason why someone would use Excel over Pandas is due to lack of familiarity with the former's interface.
It is easy to imagine a natural language interface over Excel that does the job well.
A query could look like "List component categories, with median failure rate higher than 7 per million hours".
Same applies to Salesforce and Quickbooks.
Natural language programming is the best data manipulation interface for non-technical users.
Most office jobs involve manipulating data.
Most employees holding these jobs don't know how to program.
For these people, natural language programming will be the best way to increase their productivity.

However, natural language has hard limitations.
We can't overcome these limitations without turning natural language into a programming language.

First, natural language is inherently ambigous.
Consider: "linguists like ambiguity more than most people".
When it comes to performing one-off data manipulation jobs this is not a problem.
That's why I foresee non-technical intellectual work being performed using this interface.
However, when building complex data manipulation systems, this ambiguity causes bugs.
One way to avoid ambiguity in natural language is by being more specific.
By being more specific we exchange ambiguity with verbosity, bringing us to the second issue of natural language for programming.

Second, natural language is a verbose way to express data manipulation tasks.
Verbosity is a byproduct of two issues: ambiguity and domain generalizability.
Consider the task of "incrementing every element in the list of sales figures by one".
In Python we'd just write:

```python
sales_figures = [sales_figure+1 for sales_figure in sales_figures]
```

Third and most important, the specialists in the field don't _want_ to use natural language.
When communicating technical ideas with their peers mathimaticians, computer scientists, and software engineers all use a type of non-natural language.
Mathematicians write down their ideas using mathematical notation.
Computer scientists and software engineers use pseudocode.
I believe these two formalisms are the ceiling of how high-level a programming language can be.


## How will a solution look like?

What will be the capabilities of programming++?
How will these capabilities solve the previously outlined problem?

## An implementation outline

A description of how I foresee capabilities, described in the previous section, implemented.


## Required technical progress

1. What technical progress is required to realise the implementation propsed in the previous section.
    1. Code generation and editing
    2. Langauge design progress


## Why do I believe this progress will occur within the next 10 years?

I'm asume that code generation capacities are sufficiently capable that they can generate 3 months worth of programmer's effort without human involvement.
Contrast this with current capacity of LLMs to generate code.
Today LLMs can barely generate a solution to a non-trivial leetcode problem.
[SWE Bench](https://www.swebench.com/) dataset contains demonstrative examples of problems that a software engineer would encounter at work.
At the time of writing best models can only solve less than 2\% of them.

Is it realistic to assume that models will improve 40 times?
I'm assuming at least 80\% pass rate is required for the vision above to become reality.
If we would be considering the general reasoning capapacity of LLMs, such improvement would be speculative.
However, in the realm of code generation such assumption is realistic.
Unlike reasoning in natural language, we already have tools for verifying and analyzing code.
In fact, the ground truth of semantic value of a statement in a programming language.
This is a _huge_ advantage over natural language.
Natural language is inheritly ambigous.
Having an automating system for infering the meaning of an English sentence would render NLP essentially solved.
Or at least solved by our current understanding of the field's goals.


----

## How Will The Next Programming Paradigm Look Like?

1. It will be a programming language.
2. I'd like to see it prioritize power users over new ones.
    There's a trend in devtools space that currently prioritizes ease of adoption over poweruser capacity.
    Consider the power of classic tools such as Regex, Git, and awk.
    Each one of them is intimidating to the new user.
    Yet the initial fright and confusion are a humble price to pay for the power unlocked by these tools.
    Each one of them requires user to begin thinking differently about the problem at hand.
    Once the user has adopted the thought process, using it becomes second nature.
    The tools are also empowering.
    The original developers of Regex could not have foreseen that their tool will be enable natural language processing or advanced software analysis software.
    But they ensured that Regex is useful for these applications by baking a minimal amount of assumptions into the tool.

    Now contrast the aformentioned tools with the contemporary ones.
    For example, VS Code and Supabase.
    They are very intuitive for the newcomer but lack expresivity for the users who want to slightly deviate from the path envisioned by the original devs.
    If you want to bind keyboard shortcut for finding and opening files in VS Code, you're pretty much screwed.
    Trust me, I've tried bunch of plugins and none can compare with Neovim's Telescope.

2. The interface and workflow will need to be related to either existing programming languages or another formalism familiar to devs.
    In programming language design there's core source of tension.
    The tradeoff between ease of learning and novelty.
    The main barrier for adoption of a new programming language is the time it takes for devs to learn it.
    The clever folks designing programming languages have a hack to reduce even this cost.
    If the syntax of a programming language is similar to one they already know, then the dev's can bootstrap the knowledge of an existing language into a new one.
    That's why Java looks so much like C++.

    <!-- TODO: describe the competition situation where given the new capacity of LLMs and two hypothetical langauges the most familiar would win.
        -->
    Just like any design decision this one comes at a cost.
    The most extreme version of this "hack" would be to just reimplement an existing programming language.
    But then there would not be much space to fit in new ideas on programming language design.
    However, as the language designer is trying to fit in more ideas into the language, it becomes less familiar to the people who will have to learn it.
    This is a big risk.
    There's a maximum carrying capacity for the new ideas that a language can fit, if its designers want it to actually gain popularity.

    I think Chris Latner has demonstrated how to make effective use of the space for new ideas, while designing Mojo.
    Mojo is implemented as a superset of Python.
    This means that plain Python code is can already be compiled and run by a Mojo interpreter.
    But then as the programmer learns about Mojo, she can gradually take advantage of its features.
    This feels like the best of both worlds.
    The minimal learning time for Mojo is zero hours.
    At the same time, Mojo's designers have been able to fit plenty of clever ideas into the language.

    Maybe this is a good case study of how our desired language should look like?
    <!-- TODO: link to point (2.) in what it takes to succeed in an enterprise -->

