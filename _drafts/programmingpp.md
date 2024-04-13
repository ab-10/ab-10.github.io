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

## The Ultimate Prize of DevOps


<!-- Prev intro statements -->
Our hypothesis is that currently people are trying to reconcile LLM capabilities with old software engineering paradigms that have developed in a very different world.
For example, the programming languages themselves are not made in a way that makes generation in them easy and don't leverage generation under the hood.

We are at the beginning of a paradigm shift that will make the aforementioned tasks as relevant as the problem of punch card sorting after the invention of FORTRAN.
Current software engineering problems are tactical wedges (<5 year time horizon) but the code ML startups are fighting a war over something bigger than that.

We (the code gen startups) are trying to trying to reconcile software engineering practices built around human programmers to the world where both AI and human programmers work with each other.
<!-- End of prev intros -->

Large language models have the capacity to make a plethora of existing mundane software engineering tasks obsolete.
Therefore it is natural to see the current DevOps landscape as fighting over the winning automations of existing software engineering tasks.
I believe such an approach is the path towards winning in the space rather than a victory itself.
We are currently shifting from a world where teams of human programmers collaborate with each other, to hybrid teams of human and AI software engineers.
The real prize of DevOps within the next 10 years will be defining the winning software engineering paradigm for the new programmer teams.

Although the idea that programming will change is non-controversial, claiming that I can time this change is.
Let me provide more details on my thought process and the core assumptions behind this claim.

At the most basic level, developers will adopt a new tool if it solves an existing problem and the cost of switching to that tool is significantly smaller than the cost of the problem.
The most powerful tools also enable people to think differently about problems.

While FORTRAN was a way of writing Assembly in a more suscint way, that was not its main contribution.
FORTRAN enabled programmers to think about solutions in terms of function calls and control structures.
In other words, an Assmebly programmer can save a lot of keypresses by writing the same logic in a more susinct language.
However, by being able to write IF statements and DO-WHILE loops directly, FORTRAN becomes a tool for _thinking_ about a problem.
This is the moment when a tool is suficiently powerful to enable a new way of thinking about programming -- a new programming paradigm.

Version control tools and Git in particular have enabled a different paradigm shift.
Ability to quickly compare different versions of code, makes it easy to recover from mistakes.
Paired with automated testing, version control is one of the core technologies that makes agile programming possible.
Unlike programming paradigm shift, agile is a shift in team and even company culture.

Consequently, two things need to be true for LLMs to unlock a new software engineering paradigm:
1. There's a major issue with the leading software engineering paradigms of today.
2. LLM capabilities will improve and meet this issue.

## What is the main problem with the current software engineering process?

We've reached maximum system complexity that teams of human programmers can handle.
For evidence, just consider how long it takes to develop a feature in an enterprise codebase vs the time it would take it to build without the burden of existing code.

It is fair to consider the primary bottleneck of enterprise development to be the human system.
I believe the software system complexity actively contributes to this too.
Just think how a multi team-lead meeting on a complex refactoring project would be unecessary if said refactoring project would take an afternoon instead of a quarter.
In that case the meeting (or better a Slack thread) could be about an existing PR.
If the change is unwelcome, the PR would be rejected.
As it involved less than a couple of hours of human engineering effort, the loss would be nelgigible.
But now as such refactor would take a quarter of team's time, extensive prior planning is necessary.



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

I've outlined the core problem and the technology underpining a solution to it.
Now we're ready to discuss how a user interface to this problem would look like.

First, this user interface will be a programming language.
Programming language as oposed to either GUI or a natural language interface.

<!-- Why not natural language programming -->
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

<!-- Why is now the time to build a new metaprogramming paradigm -->
There have been many previous failed attempts to create a new (meta-)programming paradigm.
1. Previous metaprogramming attempts mainly took advantage of good old fashioned AI and complex type systems, which was unable to generalize to programming projects beyond toy problems.
    1. We believe that LLMs are the missing bit for generalizability here.

## How will the market for DevOps tooling look like?

### Hotpath vs Coldpath Tools
At the highest level companies that generate/edit code and other devtools companies (e.g. automating QA) will remain independent.
Within code generation and editing we see companies that operate within user's hotpath and outside of it as distinct.

1. IDEs/tools in programmer hotpath: even as the way we write code changes, humans will continue writing code (in some form), to do so they'll need an interface.
    There will be companies creating these interfaces.
    Other companies with better models alone are unlikely to win in this space because better models will be less important than solutions that fit in the best with programmer's existing workflow.
    Copilot and cursor compete in this space.
    Here we believe an IDE solution will be the winning one, as that is the stickiest capturing platform for a developer.
    Historically JetBrains realised they can perform analysis on top of Java codebase to create the best tooling and won in the space.
    Now, LLMs provide new interface and analysis capabilities that will provide oportunities for new companies to emerge.
2. Tools operating outside of programmers hotpath:
    tools operating in programmer's hotpath are unlikely to win here, because they need to focus on the interface with the programmer and are limited by low latency requirements.
    On the other hand, tools that operate outside of programmer's hotpath can leverage more compute intensive solutions, larger models, and focus on performing narrow functions.
    Examples of subspaces:
    1. CI/CD
    2. Safety analysis
    3. Automatic bug identification


### Markets Accross User Groups

We believe that in the next 10 years software engineering will undergo a paradigm shift akin to how a computer turned from a job title to a digital machine.
So the real question is how will metaprogramming look like and who will be its users?

The only software engineering problem that will remain (and amplify) is that of data processing.
Everything else is up for grabs.

We believe that the paradigm shift is sufficiently different, that it will create more specialized use-cases than it will replace.
In particular, we believe that that there are different user groups with distinct users

The code ML startups who create the best paradigm for their users to process and manipulate data, not code, will win.
This gives startups the opportunity to redefine how their customers solve business and product problems through data.

As different developer groups (e.g. enterprises, startups, hobbyists) have wastly different needs, the existing differences in programming paradigms and tooling will vastly amplify.
Therefore, the landscape after startups figure this question, will consist of siloed markets for each user group.
While technology changes, the human patterns remain largely the same.
The markets for each segment will be similar too.
So the market for hobbyists and startups will be served by a large number of competing solutions, as these user groups can experiment with the latest tooling and switching costs are minimal.
Because of the transition costs the enterprise devtools space will become a winner takes all market in the next 10 years.

### What will it Take to Win in Enterprise Space

The success of code gen startups for enterprsies will be determined by:
1. Solving the most expensive problems first,
2. Integrating with legacy systems,
3. Integrating with existing human processes (as those won’t change/will change slowly).


## Considering The Software Engineers

1. How will software engineering as a job change?
2. What should software engineers do with their careers?

