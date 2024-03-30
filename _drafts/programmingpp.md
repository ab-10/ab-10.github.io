---
layout: post
title: "Programming++"
categories: Prose
date: 2023-04-23 10:00:00 +00000
---- 

The ability of state of the art language models to generate code is insane.
We've finally reached a point where 
Code generation is nothing new, symbolic 
This is the first time that we see a single model being able to generate code in variety of languag


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

We've reached maximum system complexity that teams of human programmers can handle.k
For evidence, just consider how long it takes to develop a feature in an enterprise codebase vs the time it would take it to build without the burden of existing code.

It is fair to consider the primary bottleneck of enterprise development to be the human system.
I believe the software system complexity actively contributes to this too.
Just think how a multi team-lead meeting on a complex refactoring project would be unecessary if said refactoring project would take an afternoon instead of a quarter.
In that case the meeting (or better a Slack thread) could be about an existing PR.
If the change is unwelcome, the PR would be rejected.
As it involved less than a couple of hours of human engineering effort, the loss would be nelgigible.
But now as such refactor would take a quarter of team's time, extensive prior planning is necessary.

## Why do I believe codellm capabilities will rapidly increase:

In the example above, I asume that code generation capacities are sufficiently capable that they can generate 3 months worth of programmer's effort without human involvement.
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



## How Will The Next Programming Paradigm Look Like?

Programming languages will change to accommodate generation in the same way they changed in the past to accommodate improved IDE capabilities.
Think new kinds of annotations in Python akin to Python's typing system.

We imagine that an interface that solves this problem will be sufficiently powerful that it is best thought of as a new programming language.

I don't know how the exact end user interface will look like (i.e. what will be the design of the programming languge).

1. This interface will be sufficiently novel and powerful that it will redefine the relationship programmers have with their code.
    1. New programming languges mainly fail, because:
        1. Steep learning curve
            For us this is not an issue.
            At the beginning, teams can just learn individual commands (e.g. upgrade this depenendency) with sufficient power to save them months of work.
        2. Inability to integrate with existing stack.
    2. Previous metaprogramming attempts mainly took advantage of good old fashioned AI and complex type systems, which was unable to generalize to programming projects beyond toy problems.
        1. We believe that LLMs are the missing bit for generalizability here.

By "programming language", we mean a couple of beliefs:
1. We believe that natural language programming won't replace a specialized language, especially for enterprise users with huge data processing needs.
    1. e.g. mathematicians still use formal language to communicate with each other.
2. This interface will be sufficiently novel and powerful that it will redefine the relationship programmers have with their code.
    1. New programming languges mainly fail, because:
        1. Steep learning curve
            For us this is not an issue.
            At the beginning, teams can just learn individual commands (e.g. upgrade this depenendency) with sufficient power to save them months of work.
        2. Inability to integrate with existing stack.
            That's why we are operating on Java
    2. Previous metaprogramming attempts mainly took advantage of good old fashioned AI and complex type systems, which was unable to generalize to programming projects beyond toy problems.
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

