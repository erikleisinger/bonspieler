## Project Structure

This project follows principles of Feature Sliced Design, with some modifications to accommodate the specific needs of a tournament structure.

### Tournament Structure

> **Tournaments** contains O(n) **stages**.
>
> > **Stages** can be either **bracket** or **pool** stages.

> > **Bracket stages** contain O(n) **brackets**.
> >
> > > **Brackets** contains O(n) **rounds**
> > >
> > > > **Rounds** contain O(n) **matches**.
> > > >
> > > > > **Matches** contain O(n) **teams**.

> > **Pool stages** contain O(n) **pools**.
> >
> > > **Pools** contain O(n) **matches**.
> > >
> > > > **Matches** contain O(n) **teams**.

### Rules of Modules

One of the benefits of Feature-Sliced Design is its strict rules that govern the structure of the project. When followed, it enabled a maintainable, scalable codebase with clearly defined contracts between modules.

We try to follow the rules of Feature-Sliced Design as much as possible, but we have added a "Modules" Layer to better accommodate the heirarchical nature of a tournament.

**In effect, the `modules` layer exists as an extra slice between the **features** and **widgets** layers of a traditional Feature-Sliced Design architecture, with additional rules for cross-importing between modules:**

#### ✅ Modules are allowed to

> ✅ Import from the **features**, **entities** and **shared** layers (never vice-versa) in `/src`

> ✅ Import from other modules, **only if** the importing module is "higher" in the tournament hierarchy than the module it imports.
>
> For example, the `tournament-stage-manager` module can import from the `bracket-manager` module, because a tournament stage is the parent of a bracket (see the heirarchy above).

#### ❌ Modules are not allowed to

> ❌ Import from any layer higher than the **features** layer in `/src`

> ❌ Import from any module that is higher than it or equal to it in the tournament hierarchy.
>
> For example, the `tournament-stage-wizard` module cannot import from the `tournament-stage-manager` module, because they both pertain to the "stage" level of a tournament. Similarly, the `bracket-manager` module cannot import from the `tournament-stage-manager` module, because the `tournament-stage-manager` module is higher in the tournament hierarchy.
