const {
	fmImagesToRelative
} = require('gatsby-remark-relative-images');
const path = require(`path`);
const {
	createFilePath
} = require(`gatsby-source-filesystem`);
let checkstatus = false;
let redirectObject;
exports.onCreateNode = ({
	graphql,
	node,
	getNode,
	actions
}) => {
	const {
		createRedirect
	} = actions;

	if (checkstatus) {
		redirectObject.redirect.forEach((redirectRequest) => {
			// console.table(redirectRequest);
			if (redirectRequest.status) {
				const __from = redirectRequest.from;
				createRedirect({
					fromPath: __from,
					toPath: redirectRequest.to,
					isPermanent: true
				});
			}
		});
	}

	fmImagesToRelative(node);

	const {
		createNodeField
	} = actions;
	if (node.internal.type === `MarkdownRemark`) {
		const filepath = createFilePath({
			node,
			getNode,
			basePath: `src`
		});
		let slug = node.frontmatter.slug;

		if (filepath.includes('pages/blog/')) slug = 'blog/' + node.frontmatter.slug;
		createNodeField({
			node,
			name: `slug`,
			value: slug
		});
	}


};

exports.createPages = ({
	graphql,
	actions
}) => {
	const {
		createPage
	} = actions;
	return new Promise((resolve, reject) => {
		resolve(
			graphql(`
      {
			slug_setting: markdownRemark(frontmatter: {issetting: {eq: true}, contenttype: {eq: "slug_setting"}}) {
				frontmatter {
					title
					issetting
					redirect {
						from
						to
						status
					}
				}
			}
      }
    `).then((result) => {

				if (result.data.slug_setting) {
					redirectObject = result.data.slug_setting.frontmatter;
					checkstatus = true;
				}
			})
		)
	});
};

exports.onCreateWebpackConfig = ({
	stage,
	actions
}) => {
	actions.setWebpackConfig({
		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules']
		}
	});
};
