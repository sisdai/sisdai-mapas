<template>
    <div class="select">
        <select >
            <slot></slot>
        </select>
    </div>
</template>

<script>
export default {
    name:"DaiMapSelector",

}
</script>

<style lang="scss" scoped>
.select{
    height: 2.5em;
    display: inline-block;
    position: relative;
    max-width: 100%;
    margin: 3px 0;
    vertical-align: top;
    box-sizing: inherit;

    &:after{
        border-color: #485fc7;
        right: 1.125em;
        z-index: 4;
        border: 3px solid var(--accent-color);
        border-radius: 2px;
        border-right: 0;
        border-top: 0;
        content: " ";
        display: block;
            height: .625em;
            margin-top: -.4375em;
            pointer-events: none;
            position: absolute;
            top: 50%;
            transform: rotate(-45deg);
            transform-origin: center;
            width: .625em;
        }

    select{
        padding-right: 2.5em;
        border-radius: .375em;
        box-shadow: 1px 1px 8px 3px #00000026;
        height: 2.5em;
        cursor: pointer;
        background-color: var(--main-bg-color);
        display: block;
        padding-bottom: calc(.5em - 1px);
        padding-top: calc(.5em - 1px);
        padding-left:  .75em;
        line-height: 1.5;
        margin: 0;
        position: relative;
        border: none;
        outline: 0;
        -moz-appearance: none;
        -webkit-appearance: none;
        
    }
}
</style>