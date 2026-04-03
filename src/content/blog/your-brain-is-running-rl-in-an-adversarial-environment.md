*I work in AI, mostly on LLMs, training, serving, and everything in between. But the subject that genuinely fascinates me, the one I wish I could have studied formally, is neurobiology. Not because it's abstractly interesting, but because it's about us. About why we do what we do, why we can't stop what we know we should stop, and why the most important things in our lives are often the ones we pursue least.*

*I've wanted to write this for a long time. This is my attempt to build intuition for how reinforcement learning actually runs in the human brain, then connect it to the environments we've built around ourselves. I'll save the technical bridge to AI for the next post. For now, just the neuroscience.*

## The Wrong Mental Model

Most self-help advice starts with the assumption that you have a discipline problem. You know what you should do. You just don't do it. The prescription is always a variation of: try harder, build better habits, remove distractions, hold yourself accountable.

This is the wrong model. Not because discipline is irrelevant, but because it treats the brain as a broken intention-executer rather than what it actually is: a learning system. A prediction engine. A machine that has been running reward-based learning for millions of years, and doing it extraordinarily well.

You are not weak. You are running a reinforcement-learning system in an environment engineered to hijack anticipation, uncertainty, and habit formation. Once you understand the mechanism, the problem looks completely different.

---

## Dopamine Is Not What You Think

Here is the thing most people get wrong about dopamine: they think it signals pleasure. Something good happens, dopamine goes up, you feel good. Something bad happens, dopamine drops, you feel bad. That is not what the research shows. And getting this wrong leads to systematically misunderstanding addiction, motivation, and why modern environments are so difficult to escape.

The real story starts in the 1980s in Fribourg, Switzerland, where a neuroscientist named Wolfram Schultz was doing something mundane: recording from dopamine neurons in awake monkeys to study motor control. He expected to see dopamine fire when the monkey moved. Instead, it fired when the monkey got an unexpected reward.

That was interesting. But what happened next changed neuroscience.

Schultz trained the monkeys to associate a light with a juice reward. Press the lever after the light, get juice. Over weeks of learning, something shifted. The dopamine spike, which had originally appeared at the juice, moved. It migrated backward in time. By the time the monkey had fully learned the task, dopamine fired at the  **light** , not the juice. When the juice arrived, predictably, right on schedule, dopamine neurons were mostly silent.

The juice or i would say reward, itself had become almost neurologically irrelevant.

What dopamine was tracking was not the reward. It was the  **prediction of reward** . More precisely, it was the difference between what the brain expected and what actually happened. In 1997, Schultz, along with theorists Peter Dayan and Read Montague, formalized this as Reward Prediction Error and showed that it maps mathematically onto temporal-difference learning, a core algorithm in reinforcement learning.

The brain is running RL. Dopamine is the TD(Temporal difference) error signal.

---

## The Three States of the Signal

Once you have the RPE framework, the three possible states fall out cleanly.

**Better than expected.** A reward arrives that you didn't predict, or is larger than you anticipated. Dopamine neurons fire rapidly, spiking above baseline. The brain's message: *that was surprising and good, update your model, do that again, remember exactly what the cue was.* This is how learning happens. You post something online expecting nothing, and wake up to a flood of replies. You didn't predict it. Dopamine spikes. Your brain files away "you start to post more often."

**Exactly as expected.** You predict a reward, it arrives exactly as predicted. Dopamine neurons do not change at reward arrival. The spike already happened at the cue. The brain's message: *everything went according to plan, model accurate, no update needed.* This is why your morning coffee stops feeling good after a while. You predicted it perfectly. There is nothing to learn. The pleasure is there, but the dopamine surge at delivery has flattened.

**Worse than expected.** You expected a reward and it doesn't come, or it's smaller than anticipated. Dopamine neurons dip *below* baseline, a suppression. The brain's message: *that was worse than predicted, update downward, stop doing that.* This is why being left on read when you expected a reply feels physically unpleasant. The dip is a teaching signal.

There's a critical insight buried in these three states: **brain is not chasing pleasure. It is chasing surprise.** Predictable rewards stop generating the learning signal. Your brain already knows about them. What it responds to is new information, specifically the gap between what it expected and what happened.

This has a brutal corollary. Consistent goodness is neurologically boring. Not because the thing isn't good, but because it's fully predicted.

---

## Phase Two: The Anticipation Shift

Here is where things get stranger.

Once dopamine learns to fire at the cue rather than the reward, something remarkable happens: the cue itself becomes motivationally powerful. Not just informationally, but motivationally. Seeing the light that predicts juice doesn't just tell the monkey juice is coming. It creates a pull toward getting the juice.

Sapolsky, who writes about this in "*Behave"* better than almost anyone, puts it precisely: dopamine is mostly about the *anticipation* of reward, not its receipt. Human beings, unlike other primates, can sustain dopamine-driven anticipation for decades. We can work toward something for years on the basis of a predicted reward that may never arrive. No monkey presses a lever because heaven is at the other end. Humans do.

That capacity is what built every cathedral, every science project, every career, every relationship, literally everything. It is also what makes us vulnerable to anything that can convincingly simulate the promise of reward.

The distinction Schultz and his colleagues were drawing on, and which Kent Berridge at Michigan would later formalize more precisely, is the difference between *wanting* and  *liking* . Dopamine mediates wanting. The actual hedonic pleasure of receiving a reward is mediated by separate, opioid-dependent circuits, the "liking" system. These two systems can, and often do, come apart.

You can *want* something intensely and *like* it very little when you get it.

![Wanting rises while liking stays flat or falls over repeated exposure](/blog-assets/your-brain-is-running-rl-in-an-adversarial-environment/wanting-vs-liking.svg)

This is not an abstract observation. It is the mechanistic description of most compulsive behavior. The addict wants the drug with an intensity that has no relationship to how much they like it. The person compulsively checking their phone wants to check it, the dopamine pull is real, and often feels nothing of value when they do. The systems have been decoupled.

---

## The 50% Discovery

This is the most interesting part, I personally think about this alot.

In 2003, Fiorillo, Tobler, and Schultz published a paper in *Science* that added a third layer to the story, and it is the layer that makes modern technology make sense.

They showed monkeys cues that predicted rewards at different probabilities randomly: 0%, 25%, 50%, 75%, 100%. The phasic RPE signal (the spike) behaved as expected, firing proportionally to the gap between what was predicted and what arrived.

But there was a second dopamine response they hadn't previously seen. A  *sustained* , gradually ramping activation that persisted from the cue until the moment of potential reward. This wasn't the prediction error signal. It was something else  and it was maximal at exactly 50% probability.

![Phasic and sustained dopamine responses across reward probability, based on Fiorillo 2003](/blog-assets/your-brain-is-running-rl-in-an-adversarial-environment/fiorillo-probability-responses.svg)

The paper's conclusion was precise: *uncertainty is maximal at P = 0.5, and so is this sustained dopamine response.*

Think about what this means. At 100% reward probability, there is no uncertainty. The brain knows what's coming, so the sustained ramp doesn't appear. At 0% there's nothing to anticipate. But at 50%, pure uncertainty, pure "maybe," the brain activates a sustained anticipatory response that has no resolution until the outcome arrives.

The brain literally cannot settle down when the outcome is uncertain. It stays in a heightened state until resolution arrives. And resolution only comes when you actually find out. Which means the only way to stop the state is to check, to pull the lever, to refresh the feed.

This is not metaphor. This is the measured firing rate of dopamine neurons in a living brain, published in one of the most cited papers in behavioral neuroscience. **The brain literally goes into a higher state of activation when the outcome is uncertain.**

Skinner showed in the 1950s that variable ratio reinforcement, where sometimes you get the reward and sometimes you don't, produces behavior that is nearly impossible to extinguish. Fixed schedules stop quickly when you remove the reward. Variable schedules keep going long after, as if the brain simply cannot accept that the uncertainty is resolved.

Now read this and notice what they have in common:

* You send an important message, a pitch, a text you care about, or an email after a difficult conversation, and you don't know if you'll get a reply. You check your phone every few minutes not because you expect something good, but because you can't resolve the uncertainty any other way.
* A relationship where someone is sometimes warm and available, sometimes cold and distant, pulls harder than one that is consistently either. The inconsistency isn't a flaw in the attachment. Neurologically, it's the source of it.
* You post something online, an opinion or a piece of work, and the response is unpredictable. Sometimes it lands, sometimes it disappears into silence. You check back not because the checking feels good, but because the open loop doesn't close until you do.
* A manager who sometimes praises your work effusively and sometimes ignores it entirely keeps you more anxious and more engaged than one whose feedback is steady and calibrated.
* You're mid-task on something that matters and you don't know yet if it's good. Someone else will judge it eventually. The uncertainty about that judgment pulls you away before you've finished.

None of these feel like addiction. They feel like normal life. That is precisely the point. The mechanism is the same one. The dosage is lower. The access is unlimited. Some were engineered deliberately. Product designers at the largest technology companies studied this research and built around it. Others emerged from selection pressure. The behaviors and products that captured the most attention survived, regardless of intent.

**The uncertainty itself has become the training signal.**

---

## Reward hacking: When the Signal Gets Hijacked

Your dopamine system evolved to help you learn what is good for survival, what to repeat, and what predicts reward. For most of evolutionary history, the signals it tracked, food, safety, social connection, status, reproduction, were strongly correlated with actual outcomes.

Modern environments have found a way to deliver the signal without the outcome.

This is reward hacking in biological form. The internal signal reads "massive reward" or "important information incoming." The actual long-term value may be zero or negative. But the system doesn't know that. It was not built to distinguish between the proxy signal and the real thing.

**Addiction** is the clearest case. Drugs of abuse generate dopamine surges orders of magnitude larger than any naturally occurring reward. Cocaine, for instance, produces dopamine release at a scale the brain never encounters in ordinary experience. The brain learns: "this is extremely valuable, repeat this, prioritize cues associated with this." The learning machinery gets steered by an artificial signal. The result is Berridge's description: "a starved want in an unstarved brain." The wanting is real, amplified, urgent. The liking is absent or fading. The systems have been completely decoupled. But the same mechanism runs at lower intensity in dozens of everyday behaviors.

**Status:** Human beings are neurologically sensitive to social standing because in our evolutionary past, status correlated with access to resources, mates, protection. Status signals activated real reward circuitry because they predicted real outcomes. Modern environments allow status signals to be detached from genuine value. Posting for validation rather than truth. Choosing careers for title prestige rather than fit. Arguing to win rather than to learn. The dopamine system responds to the social approval signal. It doesn't audit whether the underlying achievement is real. The proxy fires the circuit.

**Fear and avoidance:** The reward system works not just on positive reinforcement but on the relief of negative states. You feel anxious about a difficult conversation. You avoid it. The anxiety drops. Dopamine, or rather its cousin, the relief circuit, registers this as: *avoidance worked, do it again.* The next time avoidance becomes more automatic, more default. The behavior that reduces short-term discomfort trains itself in, regardless of its long-term cost. Procrastination, social withdrawal, not opening the email, staying in the bad job: these are not laziness. They are learned behaviors, reinforced by the relief signal.

**Habits:** Once a behavior loop is sufficiently reinforced, the prefrontal cortex largely disengages and the behavior runs automatically: cue → routine → reward. This is efficient. It would be exhausting to make every action a conscious decision. But habits can persist long after the conditions that made them valuable have changed. The habit of opening your phone when bored was wired in at a time when it sometimes produced something interesting. Now the environment has changed, the value is mostly gone, but the cue-triggered behavior still fires. In RL terms, these are cached policies from old reward conditions. The policy keeps executing even though the environment has shifted.

---

## The Relief Loop

There is one more mechanism that doesn't get discussed enough, and it may be the most important one for understanding modern distraction.

Most people assume that attention-capturing products work by delivering pleasure. They don't, not primarily. They work by delivering  *relief* .

When you are bored, a mild aversive state activates. When you are uncertain, about something important or just about what to do next, a mild aversive state activates. When there is emotional discomfort, loneliness, task resistance, anxiety, the same thing happens: a low-grade internal pressure that wants resolution.

Opening a feed delivers relief. Not pleasure, just the removal of that state. And here is the critical point:  **relief is also a reward** . The dopamine system doesn't distinguish between "something good happened" and "something bad stopped happening." Both fire the learning circuit. Both teach the brain to repeat the behavior.

This means a product doesn't need to make you happy. It only needs to make *not using it* feel slightly worse than using it. The relief loop is self-sustaining. You check your phone not because you expect something wonderful, but because the mild discomfort of not checking is slightly more aversive than checking. The bar is low. The behavior fires constantly.

Once you see this, the framing of "I should use this less" shifts. It's not about fighting pleasure. It's about managing state and changing what states you're in that make checking feel necessary.

---

## Why Willpower Is the Wrong Tool

The prefrontal cortex, the part of your brain that plans, reasons, and exercises self-control, is real, and it works. But it is metabolically expensive, it depletes, and it is operating against systems that are older (Limbic System), faster, and have been specifically tuned by evolutionary selection pressure, and in some cases by deliberate product design.

Trying to override a reinforcement-learning system with willpower is like trying to win a tug-of-war against something that has been practicing for 200 million years and doesn't get tired.

What actually works is not suppression. It is redesign.

**Remove the cue.** The loop is cue → routine → reward. If the cue isn't present, the loop doesn't start. Phone in a different room eliminates more checking behavior than any amount of resolve at the moment of temptation. The environment does the work that willpower cannot sustain.

**Change the reward schedule.** Fixed-time access to variable rewards weakens their hold. Checking a feed three times a day at set times is neurologically different from having open-loop, cue-triggered access. The variable reward is still there, but you've removed the cue-triggered policy execution.

**Build competing loops.** The brain doesn't unlearn easily, but it can learn something new that competes with the old association. A 45-minute deep work block followed by a chosen, bounded reward can replace an open-loop distraction pattern, not by fighting it, but by routing the dopaminergic seeking into a different channel.

**Understand the state.** Before you reach for the habit, notice what state triggered it. Boredom? Uncertainty? Anxiety? Task resistance? Naming the state does two things: it introduces a moment of conscious evaluation, and over time it helps you address the state directly rather than just routing it through the habit.

None of this is a cure. Berridge's incentive-sensitization research is clear that once a mesolimbic system has been sensitized, by drugs or by years of a reinforced behavior, the sensitization is persistent. The wanting doesn't simply go away. But changing the architecture of the environment can change which behaviors the system runs toward.

---

## The Deeper Point

The honest framing is not "here's how to fix yourself." The brain isn't broken. It's learning from signals that have come loose from the values they used to represent. Status signals used to track real standing. Validation used to track real connection. Relief used to mean a problem actually resolved. The mechanism still works perfectly. The environment it's running in has changed.

You are not fighting your brain. You are trying to redirect a system that is working exactly as it was designed. It's predicting rewards, tracking uncertainty, building habits from reinforced behavior, seeking relief from aversive states. All of that is correct behavior for a biological organism navigating an environment where those mechanisms track real value.

The problem is not the mechanism. The problem is the environment. We have built, and are living inside, an environment where the signals have been systematically decoupled from the values they're supposed to represent. Status signals don't reliably indicate genuine achievement. Social validation doesn't reliably indicate real connection. Novelty doesn't reliably indicate useful information. Relief doesn't reliably indicate a problem solved.

The question is not "how do I fix my brain?" The brain is fine. The question is "how do I build an environment where the signals and the values are re-aligned?"

The same mechanisms, prediction error, proxy rewards, the gap between signal and objective, are exactly what researchers are grappling with when they train LLMs through reinforcement learning. RLHF, PPO, GRPO, reward hacking, agents that optimize the signal instead of the goal. Different substrate, same problem. That's the next post.

---

**Sources:**

* Schultz W, Dayan P, Montague PR. A neural substrate of prediction and reward. *Science* 1997
* Fiorillo CD, Tobler PN, Schultz W. Discrete coding of reward probability and uncertainty by dopamine neurons. *Science* 2003
* Schultz W. A dopamine mechanism for reward maximization. *PNAS* 2024
* Berridge KC, Robinson TE. Liking, wanting, and the incentive-sensitization theory of addiction. *American Psychologist* 2016
* Robinson TE, Berridge KC. The incentive-sensitization theory of addiction: 30 years on. *Annual Review of Psychology* 2025
* Berridge KC. Roles of “Wanting” and “Liking” in Motivating Behavior: Gambling, Food, and Drug Addictions. Springer Nature Link. https://link.springer.com/chapter/10.1007/7854_2015_387
* Sapolsky RM.  *Behave: The Biology of Humans at Our Best and Worst* . 2017
