=================
LibCellML Website
=================

This repository is the source code for the `libCellML website <https://libcellml.org>`_.
The **production** branch is the source code for the libCellML website and the **staging** branch is the source code for the staging libCellML website.
The **production** branch in its rendered form is available for viewing here => https://libcellml.org.
The **staging** branch in its rendered form is available for viewing here => https://staging.libcellml.org.

The website requires data from the XML output of `Doxygen <https://www.doxygen.nl/index.html>`_ and `Sphinx <https://www.sphinx-doc.org/en/master/>`_.
These data can be produced from the build of libCellML.

Updating rendered websites
==========================

Staging
-------

Pull requests with changes for the website should be targeted at the **staging** branch.
When a pull request is merged the staging.libcellml.org website will be updated with the changes.

Production
----------

Once a review of the changes in **staging** has been made then create a pull request from the **staging** branch to the **production** branch.
Once one reviewer has approved the changes merge the pull request.
The libcellml.org website will be updated with the changes.


Project setup
=============
::

 npm install

Compiles and hot-reloads for development
----------------------------------------
::

 npm run serve


Compiles and minifies for production
------------------------------------
::

 npm run build


Lints and fixes files
---------------------
::

 npm run lint


Customise configuration
-----------------------

See `Configuration Reference <https://cli.vuejs.org/config/>`_.
