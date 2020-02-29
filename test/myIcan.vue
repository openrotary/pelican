<template>
    <section :class="['qjbyx']">
        <div :class="['ksyaf']">
            <span :class="['bgmej']"></span>
        </div>

        <span :class="['bgmej']"></span>

        <div :class="['ksyaf']" @click="ewd">
            <span :class="['bgmej']"></span>

            <ul :class="['mvdea']">
                <li :class="['xwkxn']"></li>

                <ul :class="['mvdea']">
                    <li :class="['xwkxn']"></li>

                    <li :class="['xwkxn']"></li>
                </ul>

                <ul :class="['mvdea']">
                    <li :class="['xwkxn']"></li>

                    <li :class="['xwkxn']"></li>
                </ul>
            </ul>
        </div>
    </section>
</template>
<script>
export default {
    name: "MyIcan"
}
</script>
<style lang="stylus" scoped>
 .qjbyx {
	.ksyaf {
		.bgmej {
		}
	}

	.bgmej {
	}

	.ksyaf {
		.bgmej {
			width: 60px;
			height: 30px;
			position: relative;
			flex-shrink: 0;
			flex: 2;
			font-size: 15px;
			color: #fff;
			list-style: none;
			font-style: normal;
			overflow: hidden;
			text-overflow: ellipsis;
			display: inline-flex;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			background-color: #233;
			padding: 5px 5px;
			align-items: center;
			justify-content: center;
			border-radius: 5px;
		}

		.mvdea {
			.xwkxn {
			}

			.mvdea {
				.xwkxn {
				}

				.xwkxn {
				}
			}

			.mvdea {
				.xwkxn {
				}

				.xwkxn {
				}
			}
		}
	}
}
</style>
