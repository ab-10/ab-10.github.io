#!/usr/bin/env python3
import click
import os
import re
import shutil
import pathlib
from pathlib import Path
import zipfile
from datetime import datetime

@click.command()
@click.argument('zip', type=click.Path(exists=True, file_okay=True, dir_okay=False))
def main(zip):
    # unzip the file
    notion_zip = zipfile.ZipFile(zip)
    zip_list = notion_zip.namelist()
    notion_zip.extractall()
    postname = None
    assetdir = None
    for filename in zip_list:
        filepath = pathlib.Path(filename)
        if filepath.parent == pathlib.Path('.'):
            # TODO: add comments to asserts
            assert postname is None
            assert filepath.suffix == '.md'

            postname = filepath
        else:
            if assetdir is not None:
                assert assetdir == filepath.parent
            assetdir = filepath.parent
        
    # move and rename the file
    date = datetime.today().strftime('%Y-%m-%d')
    post_title = click.prompt('How should I name this post?', type=str)
    file_title = post_title.replace(' ', '-')
    file_title = re.sub(r'[^A-Za-z0-9._-]', '', file_title)
    file_name = f'{date}-{file_title}.md'
    modified_file = Path('_posts')/file_name

    if assetdir:
        # Prompt for assetdir name
        asset_dir = click.prompt('How should I name asset dir for this post?', type=str)
        asset_dir = Path('assets')/asset_dir
        asset_dir.mkdir()

        # Move assets from zip to assets/<asset_dir>
        # and rename 
        asset_map = {}
        for i, asset in enumerate(assetdir.iterdir()):
            new_loc = asset_dir/f'figure{i}{asset.suffix}'
            shutil.move(str(asset), str(new_loc))
            asset_map[asset.name] = new_loc

    with open(postname, 'r') as originalf:
        original_file = originalf.read()

        # Reformat math
        # replace pairs of double dollar signs with \\[ and \\]
        original_file = re.sub(r'(\$\$)(.+?)(\$\$)', r'\\\\[\2\\\\]', original_file)
        # replace pairs of single dollar signs with \\( and \\)
        original_file = re.sub(r"(?:\$)([^\$\s])([^\$]*?[^\s])??(?:\$)", r'\\\\(\1\2\\\\)', original_file)

        def asset_rename(match):
            original_name = Path(match.group(2)).name
            asset_path = asset_map[original_name]
            asset_path = '..'/asset_path
            asset_name = asset_path.stem
            return fr"![{asset_name}]({str(asset_path)})"

        # Change the image captions
        original_file = re.sub(r"\!\[(.*?)\]\((.*?)\)", asset_rename, original_file)

        #TODO: ask for category
        header = f"""---
layout: post
title: "{post_title}"
categories: Reviews
---


"""
        original_file = header + original_file

    with open(modified_file, 'w') as modifiedf:
        modifiedf.write(original_file)

if __name__ == '__main__':
    main()
