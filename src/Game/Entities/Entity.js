class Entity {
  height = 1;
  width = 1;
  x = 0;
  y = 0;
  animationRotation = 0;
  collisionEntities = [];
  linkedEntities = [];
  animationCopiers = [];
  isMoving = false;
  animationList = {};
  animation;

  linkEntity(entity, offset) {
    this.linkedEntities.push({ entity, offset });
  }

  removedLinkedEntity(entity) {
    this.linkedEntities = this.linkedEntities.filter(
      ({ linkedEntity }) => entity !== linkedEntity
    );
  }

  setPosition(x, y) {
    this.isMoving = true;
    this.y = y - (this.height + 1) / 2;
    this.x = x - (this.width + 1) / 2;

    this.linkedEntities.forEach(({ entity, offset }) => {
      if (!entity.isMoving) {
        entity.setPosition(x + offset.x, y + offset.y);
      }
    });

    this.isMoving = false;
  }

  getPosition() {
    return {
      x: this.x + (this.width + 1) / 2,
      y: this.y + (this.height + 1) / 2,
    };
  }

  setAnimations(animationNames) {
    this.animations = [];

    animationNames.forEach((animationName) => {
      this.animations.push({
        ...this.animationList[animationName],
        duration: this.duration,
        iterations: this.iterations,
        direction: this.animationDirection,
        name: animationName,
      });
    });

    this.animationCopiers.forEach((copier) => {
      copier.animations = this.animations;
    });
  }

  forwardAnimations(entity) {
    this.animationCopiers.push(entity);
    entity.animations = this.animations;
  }

  setAnimationRotation(deg) {
    this.isRotating = true;
    this.animationRotation = deg;

    this.linkedEntities.forEach(({ entity, offset }) => {
      if (!entity.isRotating) {
        entity.setAnimationRotation(deg);
      }
    });

    this.isRotating = false;
  }
}

export default Entity;
