# -*- coding: utf-8 -*-
from datetime import datetime
from pathlib import Path
import os
import sys



default_role = "py:obj"

sys.path.append(os.path.abspath("./_ext"))

extensions = [
    "callouts",  # custom extension from _ext folder
    "queryparamrefs",
    "sphinx.ext.viewcode",
    "sphinx.ext.napoleon",
    "sphinx_click.ext",
    "sphinx-jsonschema",
    "sphinxemoji.sphinxemoji",
    "sphinx_copybutton",
    "versionwarning.extension",
    "sphinx_sitemap",
    "myst_nb",
    "sphinx.ext.doctest",
    "sphinx.ext.coverage",
    "sphinx_external_toc",
    "sphinx_tabs.tabs",
    "sphinx_remove_toctrees",
    "sphinx_design",
    "sphinx.ext.intersphinx",
]

myst_enable_extensions = [
    "dollarmath",
    "amsmath",
    "deflist",
    "html_admonition",
    "html_image",
    "colon_fence",
    "smartquotes",
    "replacements",
]

intersphinx_mapping = {
    "sklearn": ("https://scikit-learn.org/stable/", None),
}

# Cache notebook outputs in _build/.jupyter_cache
# To prevent notebook execution, set this to "off". To force re-execution, set this to "force".
# To cache previous runs, set this to "cache".
jupyter_execute_notebooks = os.getenv("RUN_NOTEBOOKS", "off")

external_toc_exclude_missing = False
external_toc_path = "_toc.yml"


html_baseurl = "https://docs.ray.io/en/latest"

# This pattern matches:
# - Python Repl prompts (">>> ") and it's continuation ("... ")
# - Bash prompts ("$ ")
# - IPython prompts ("In []: ", "In [999]: ") and it's continuations
#   ("  ...: ", "     : ")
copybutton_prompt_text = r">>> |\.\.\. |\$ |In \[\d*\]: | {2,5}\.\.\.: | {5,8}: "
copybutton_prompt_is_regexp = True

# By default, tabs can be closed by selecting an open tab. We disable this
# functionality with the `sphinx_tabs_disable_tab_closing` option.
sphinx_tabs_disable_tab_closing = True

# This is used to suppress warnings about explicit "toctree" directives.
suppress_warnings = ["etoc.toctree"]

versionwarning_body_selector = "#main-content"

# Add any paths that contain templates here, relative to this directory.
templates_path = ["_templates"]

# The encoding of source files.
# source_encoding = 'utf-8-sig'

# The master toctree document.
master_doc = "index"

# General information about the project.
project = "Ray"
copyright = str(datetime.now().year) + ", The Ray Team"
author = "The Ray Team"

# The full version, including alpha/beta/rc tags.
release = "2.7.0"


# The name of the Pygments (syntax highlighting) style to use.
pygments_style = "lovelace"


# -- Options for HTML output ----------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
html_theme = "sphinx_book_theme"

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
html_theme_options = {
    "repository_url": "https://github.com/ray-project/ray",
    "use_repository_button": True,
    "use_issues_button": True,
    "use_edit_page_button": True,
    "path_to_docs": "doc/source",
    "home_page_in_toc": True,
    "show_navbar_depth": 1,
    "announcement": "<div class='topnav'></div>",
}

# Add any paths that contain custom themes here, relative to this directory.
# html_theme_path = []

# The name for this set of Sphinx documents.  If None, it defaults to
# "<project> v<release> documentation".
html_title = f"Ray {release}"

# A shorter title for the navigation bar.  Default is the same as html_title.
# html_short_title = None

# The name of an image file (within the static path) to use as favicon of the
# docs.  This file should be a Windows icon file (.ico) being 16x16 or 32x32
# pixels large.
html_favicon = "_static/favicon.ico"

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ["_static"]


def setup(app):

    # Custom CSS
    app.add_css_file("css/custom.css", priority=800)

    # Custom JS
    app.add_js_file("js/custom.js", defer="defer")

