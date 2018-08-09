---
title: "@bundle"
description: How to use @bundle annotation, As well as you basically use npm package.json to describe your node project, djantaJS also provide the annotatio @bundle to describe your platform contribution manifest.
lastupdate: 
author:
tags: []
---

After reading this article, you'll know:

1. What @bundle are in djantaJS platform and how they work in detail.
2. Best practices for declaring your @bundle annotation.
3. How to throw and handle errors with @bundle.
4. How the @bundle is parsed and redenred by the runtime compile.

<h2 id="what-is-a-bundle">What is a @bundle?</h2>

@bundle are Meteor's remote procedure call (RPC) system, used to save user input events and data that come from the client. If you're familiar with REST APIs or HTTP, you can think of them like POST requests to your server, but with many nice features optimized for building a modern web application. Later on in this article, we'll go into detail about some of the benefits you get from Methods that you wouldn't get from an HTTP endpoint.
